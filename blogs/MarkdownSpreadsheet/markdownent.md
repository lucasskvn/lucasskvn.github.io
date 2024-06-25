```md
# MARKDOWNENT

Markdown est un langage de balisage simple à lire et écrire, il peut être utilisé afin de crée des pages internet simple type blog par le fait qu'il peut être converti en HTML, écrire des emails mais surtout utilisé afin de crée des documentations type README sur des plateforme type Github. Markdown à bien évidemment pleins d'autres utilités car simple à apprendre et surtout simple à crée car n'importe quel editeur de texte vous permettra de crée un fichier Markdown.

## Le fichier Markdown

Le fichier Markdown afin d'être reconnu doit être terminé par :

> .md, .markdown, .mkd, .mdown, .mdtext, .mdtxt

***

ligne 1
pas d'espaces après "ligne 1".

ligne 2  
deux espaces après "**ligne 2**".

## Les titres

# "Titre Principal"
## "Titre Secondaire" (ne contient plus de séparation en format HTML)
### Texte avec une plus grand police (ne contient pas de séparation)

## Les Textes spéciaux

Texte en **GRAS**.

Texte en *ITALIQUE*.

Texte en ***GRAS ET ITALIQUE***.

Texte ~~BARRE~~.

Texte ==SURLIGNE== (marche pas tout le temps.)

Texte <mark>SURLIGNE</mark>.

Texte <mark style="background:pink">SURLIGNE mais rose</mark>. 

### Notez que si la couleur du surlignage ne fonctionne pas vous devrez ajouter "!important" juste devant la couleur donc ici écrire : **"background:pink!important"**

Texte~en dessous~ (marche pas tout le temps.)

Texte <sub>en dessous</sub>.

Texte^au dessus^ (marche pas tout le temps.)

Texte <sup>au dessus</sup>.

Emoji = :smile: (marche pas tout le temps.)

Texte pour montrer du code = ``i = 0``.

> Texte en "quote".
>
>> Commentaire de la quote.

### Separateur/Filet (Notez que les titres et sous titre crée d'office un séparateur.)
***

## Les Intégrations

    Bloc de Code (Préciser le langage, ici du C)
    ```C 
    char *salut = "Coucou";
    i = 369;

    while (i != 2) {
        i = i - 1;
    }
    return 0;
    //Salut je suis un commentaire.
    ```

[Voici un lien internet.](https://www.youtube.com/watch?v=2tda_TCjz8w)

[Voici un lien vers un autre fichier.](/fichier2)

### Voici une image , vous notterez que le nom de le texte mis entre crochet sera "l'alt text" de l'image. Ici "tripleS".

![tripleS](/GRLSNVRDIE.jfif)

### Une image animée type gif peut être aussi implémentée. 

![mcdo](/macdoes.gif)

## Les Liste (Notez que cette liste n'est qu'un exemple, modulez la comme vous le souhaitez !!!)

* Premier objet d'une liste
* Deuxieme objet d'une liste
+ Troisieme objet d'une liste mais celui-ci est un arbre
    * Premier objet de l'arbre
        1. Première note pour le premier objet de l'arbre
        2. Deuxieme note pour le premier objet de l'arbre
    * Deuxieme objet de l'arbre
- Quatrième objet d'une liste

### Autre types de listes les "checkboxes" ou "To Do Lists"

- [ ] Mission 1
- [ ] Mission 2
   - [ ] Mission 2.1 (ça peut être une étapes afin de faire la mission 1 ou ce que vous voulez faites parler votre imaginaire.)
- [X] Mission accomplie

## Les Tables

| Droite | Centre | Gauche |
|-------:|:------:|:-------|
| T1     | T2     | T3     |

### Notez que les barres ne sont pas obligées d'être alignées, elles peuvent être totalement non droite c'est juste que c'est plus simple à lire.

| Droite     | Centre | Gauche      |
|-------:|:------:      |:-------    |
| T1   | T2 | T3                   |
```
# Voici le résultat du Markdown d'au dessus

Markdown est un langage de balisage simple à lire et écrire, il peut être utilisé afin de crée des pages internet simple type blog par le fait qu'il peut être converti en HTML, écrire des emails mais surtout utilisé afin de crée des documentations type README sur des plateforme type Github. Markdown à bien évidemment pleins d'autres utilités car simple à apprendre et surtout simple à crée car n'importe quel editeur de texte vous permettra de crée un fichier Markdown.

## Le fichier Markdown

Le fichier Markdown afin d'être reconnu doit être terminé par :

> .md, .markdown, .mkd, .mdown, .mdtext, .mdtxt

***

ligne 1
pas d'espaces après "ligne 1".

ligne 2  
deux espaces après "**ligne 2**".

## Les titres

# "Titre Principal"
## "Titre Secondaire" (ne contient plus de séparation en format HTML)
### Texte avec une plus grand police (ne contient pas de séparation)

## Les Textes spéciaux

Texte en **GRAS**.

Texte en *ITALIQUE*.

Texte en ***GRAS ET ITALIQUE***.

Texte ~~BARRE~~.

Texte ==SURLIGNE== (marche pas tout le temps.)

Texte <mark>SURLIGNE</mark>.

Texte <mark style="background:pink">SURLIGNE mais rose</mark>. 

### Notez que si la couleur du surlignage ne fonctionne pas vous devrez ajouter "!important" juste devant la couleur donc ici écrire : **"background:pink!important"**

Texte~en dessous~ (marche pas tout le temps.)

Texte <sub>en dessous</sub>.

Texte^au dessus^ (marche pas tout le temps.)

Texte <sup>au dessus</sup>.

Emoji = :smile: (marche pas tout le temps.)

Texte pour montrer du code = ``i = 0``.

> Texte en "quote".
>
>> Commentaire de la quote.

### Separateur/Filet (Notez que les titres et sous titre crée d'office un séparateur.)
***
---

## Les Intégrations

Bloc de Code (Préciser le langage, ici du C)
```C 
char *salut = "Coucou";
i = 369;

while (i != 2) {
    i = i - 1;
}
return 0;
//Salut je suis un commentaire.
```

[Voici un lien internet.](https://www.youtube.com/watch?v=2tda_TCjz8w)

[Voici un lien vers un autre fichier.](/fichier2)

### Voici une image , vous notterez que le nom de le texte mis entre crochet sera "l'alt text" de l'image. Ici "tripleS".

![tripleS](/GRLSNVRDIE.jfif)

### Une image animée type gif peut être aussi implémentée. 

![mcdo](/macdoes.gif)

## Les Liste (Notez que cette liste n'est qu'un exemple, modulez la comme vous le souhaitez !!!)

* Premier objet d'une liste
* Deuxieme objet d'une liste
+ Troisieme objet d'une liste mais celui-ci est un arbre
    * Premier objet de l'arbre
        1. Première note pour le premier objet de l'arbre
        2. Deuxieme note pour le premier objet de l'arbre
    * Deuxieme objet de l'arbre
- Quatrième objet d'une liste

### Autre types de listes les "checkboxes" ou "To Do Lists"

- [ ] Mission 1
- [ ] Mission 2
   - [ ] Mission 2.1 (ça peut être une étapes afin de faire la mission 1 ou ce que vous voulez faites parler votre imaginaire.)
- [X] Mission accomplie

## Les Tables

| Droite | Centre | Gauche |
|-------:|:------:|:-------|
| T1     | T2     | T3     |

### Notez que les barres ne sont pas obligées d'être alignées, elles peuvent être totalement non droite c'est juste que c'est plus simple à lire.

| Droite     | Centre | Gauche      |
|-------:|:------:      |:-------    |
| T1   | T2 | T3                   |
