import test from "node:test";
import assert from "node:assert/strict";
import { createDesktop, clampFrame, windowReducer } from "../src/os/model.ts";
import {
  createFilesystem,
  childrenOf,
  normalizePath,
  HOME,
} from "../src/os/filesystem.ts";
import { completeInput, runCommand, tokenize } from "../src/os/terminal.ts";
import { normalizeLastfm } from "../src/os/lastfm.ts";

const viewport = { width: 1200, height: 700 };
const files = createFilesystem([
  {
    id: "pomodocus",
    name: "Pomodocus",
    description: "A real project.",
    details: "The original description.",
    technologies: ["React", "TypeScript"],
    gallery: ["/original.webp", "/second.webp"],
    url: "https://github.com/lucasskvn/Pomodocus",
    private: false,
  },
]);

test("opening an existing app restores it without duplicating or losing its frame", () => {
  let state = createDesktop(viewport, "terminal");
  state = windowReducer(state, {
    type: "frame",
    id: "terminal",
    viewport,
    frame: { x: 70, y: 90, width: 640, height: 400 },
  });
  state = windowReducer(state, { type: "minimize", id: "terminal" });
  assert.equal(state.active, null);
  state = windowReducer(state, { type: "open", id: "terminal", viewport });
  assert.equal(state.windows.length, 1);
  assert.equal(state.active, "terminal");
  assert.equal(state.windows[0].minimized, false);
  assert.equal(state.windows[0].width, 640);
  assert.equal(state.windows[0].x, 70);
});
test("close and minimize activate the most recent visible window", () => {
  let state = createDesktop(viewport, "terminal");
  state = windowReducer(state, { type: "open", id: "fichiers", viewport });
  state = windowReducer(state, { type: "open", id: "profil", viewport });
  state = windowReducer(state, { type: "minimize", id: "fichiers" });
  assert.equal(state.active, "profil");
  state = windowReducer(state, { type: "close", id: "profil" });
  assert.equal(state.active, "terminal");
  state = windowReducer(state, { type: "desktop" });
  assert.equal(state.active, null);
  assert.ok(state.windows.every((window) => window.minimized));
});
test("maximizing preserves the restore frame and resize cannot strand a window", () => {
  let state = createDesktop(viewport, "terminal");
  const frame = state.windows[0];
  state = windowReducer(state, { type: "maximize", id: "terminal" });
  state = windowReducer(state, { type: "maximize", id: "terminal" });
  assert.equal(state.windows[0].width, frame.width);
  assert.equal(state.windows[0].x, frame.x);
  assert.deepEqual(
    clampFrame(
      { x: 3000, y: -100, width: 2000, height: 1000 },
      { width: 390, height: 600 },
    ),
    { x: 0, y: 0, width: 390, height: 600 },
  );
  assert.deepEqual(
    clampFrame({ x: 0, y: 0, width: -100, height: -10 }, viewport),
    { x: 0, y: 0, width: 300, height: 240 },
  );
});
test("repeat file associations issue a fresh launch but task switching preserves app navigation", () => {
  let state = createDesktop(viewport, "fichiers", "/home/lucas/documents");
  const launch = state.windows[0].launch;
  state = windowReducer(state, { type: "open", id: "fichiers", viewport });
  assert.equal(state.windows[0].launch, launch);
  state = windowReducer(state, {
    type: "open",
    id: "fichiers",
    viewport,
    target: "/home/lucas/documents",
  });
  assert.ok(state.windows[0].launch > launch);
});
test("virtual paths support relative, absolute and home paths without escaping the virtual root", () => {
  assert.equal(
    normalizePath("../documents", `${HOME}/projets`),
    `${HOME}/documents`,
  );
  assert.equal(
    normalizePath("~/projets//./pomodocus"),
    `${HOME}/projets/pomodocus`,
  );
  assert.equal(normalizePath("../../../../../../.."), "/");
  assert.equal(childrenOf(files, `${HOME}/projets`).length, 1);
  assert.equal(new Set(files.map((file) => file.path)).size, files.length);
});
test("the terminal reads the same README and launches the same article as Files", () => {
  const cd = runCommand("cd projets/pomodocus", HOME, files);
  assert.equal(cd.cwd, `${HOME}/projets/pomodocus`);
  assert.match(
    runCommand("cat README.md", cd.cwd!, files).output,
    /The original description/,
  );
  assert.deepEqual(runCommand("open article.app", cd.cwd!, files).open, {
    id: "fanzine",
    target: "pomodocus",
  });
  assert.deepEqual(runCommand("open fanzine pomodocus", HOME, files).open, {
    id: "fanzine",
    target: "pomodocus",
  });
  assert.deepEqual(runCommand("open capture-2.image", cd.cwd!, files).open, {
    id: "fichiers",
    target: `${HOME}/projets/pomodocus/capture-2.image`,
  });
  assert.equal(runCommand("cd README.md", cd.cwd!, files).cwd, undefined);
});
test("terminal completion and quoting work without evaluating commands", () => {
  assert.deepEqual(completeInput("cd pro", HOME, files), ["cd projets/"]);
  assert.deepEqual(completeInput("open term", HOME, files), ["open terminal"]);
  assert.deepEqual(tokenize('cat "a file.txt"'), ["cat", "a file.txt"]);
  assert.equal(tokenize('cat "unfinished'), null);
  assert.match(
    runCommand("$(secret)", HOME, files).output,
    /commande inconnue/,
  );
  assert.match(runCommand("rm -rf /", HOME, files).output, /lecture seule/);
});
test("Last.fm accepts artist.name, artist text and single-item responses", () => {
  const [album] = normalizeLastfm({
    name: "An album",
    artist: { name: "An artist" },
    playcount: "42",
    url: "https://www.last.fm/music/example",
    image: [{ size: "large", "#text": "https://example.org/cover.png" }],
  });
  assert.equal(album.artist, "An artist");
  assert.equal(album.plays, 42);
  const [track] = normalizeLastfm([
    {
      name: "A track",
      artist: { "#text": "Another artist" },
      "@attr": { nowplaying: "true" },
      date: { uts: "1000" },
    },
  ]);
  assert.equal(track.artist, "Another artist");
  assert.equal(track.nowPlaying, true);
  assert.equal(track.timestamp, 1000000);
  assert.deepEqual(normalizeLastfm(undefined), []);
});
test("Last.fm data cannot create javascript links or broken placeholder art", () => {
  const [item] = normalizeLastfm({
    name: "x",
    url: "javascript:alert(1)",
    image: [
      {
        "#text":
          "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
      },
    ],
  });
  assert.equal(item.url, "");
  assert.equal(item.image, "");
});
