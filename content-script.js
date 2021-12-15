function csv_to_regex_array(csv) {
    return csv
        .split(/\r?\n\s*/)
        .filter(n => n.length > 0)
        .map(n => n.replace('Delphine', 'Délphine'))
        .map(n => n.replace('Bellaiche', 'Bellaïche'))
        .map(n => n.replace(/é/, '[eé]'))
        .map(n => n.replace(/è/, '[eè]'))
        .map(n => n.replace(/à/, '[aà]'))
        .map(n => n.replace(/ï/, '[iï]'))
        .map(n => n.split(','))
        .filter(n => n.length === 2)
        .map(n => {
            if ((i = n[1].search(/[- ]/)) === -1)
                return n;
            return [n[0], n[1].replace(/[- ](.*)/, '([- ]$1)?')];
        })
        .map(n => {
            if ((i = n[0].indexOf(' ')) === -1)
                return '\\b' + n[0] + '\\s*' + n[1] + '\\b' + '|' + '\\b' + n[1] + ',?\\s*' + n[0] + '\\b';
            return '\\b' + n[0].substring(0, i) + '(?:' + n[0].substring(i) + ')?\\s*' + n[1] + '\\b' + '|'
                + '\\b' + n[1] + ',?\\s*' + n[0].substring(0, i) + '(?:' + n[0].substring(i) + ')?\\b';
        })
        .join('|');
}

// names from parlamentarians.csv
const parlamentarians = csv_to_regex_array(`
Ada,Marra
Adèle,Thorens Goumaz
Albert,Rösti
Alex,Farinelli
Alex,Kuprecht
Alfred,Heer
Aline,Trede
Alois,Gmür
Alois,Huber
Andrea Martina,Geissbühler
Andrea,Caroni
Andrea,Gmür-Schönenberger
Andreas,Aebi
Andreas,Gafner
Andreas,Glarner
Andri,Silberschmidt
Angelo,Barrile
Anna,Giacometti
Balthasar,Glättli
Baptiste,Hurni
Barbara,Gysi
Barbara,Schaffner
Barbara,Steinemann
Bastien,Girod
Beat,Flach
Beat,Rieder
Beat,Walti
Benedikt,Würth
Benjamin,Giezendanner
Benjamin,Roduit
Brigitte,Crottaz
Brigitte,Häberli-Koller
Bruno,Storni
Bruno,Walliser
Carlo,Sommaruga
Cédric,Wermuth
Céline Marie-Claire,Amaudruz
Céline,Vara
Céline,Weber
Céline,Widmer
Charles,Juillard
Christa,Markwalder
Christian Arnaud,Lüscher
Christian,Dandrès
Christian,Imark
Christian,Lohr
Christian,Wasserfallen
Christine,Badertscher
Christine,Bulliard-Marbach
Christophe,Clivaz
Claudia,Friedl
Corina,Gredig
Damian,Müller
Damien,Cottier
Daniel Karl,Fässler
Daniel Reuwen,Jositsch
Daniel,Brélaz
Daniela,Schneeberger
David,Zuberbühler
Delphine,Klopfenstein Broggini
Denis,de la Reussille
Diana,Gutjahr
Doris,Fiala
Edith,Graf-Litscher
Elisabeth,Baume-Schneider
Elisabeth,Schneider-Schneiter
Emmanuel,Amoos
Eric,Nussbaumer
Erich,Ettlin
Erich,Hess
Erich,von Siebenthal
Esther,Friedli
Eva,Herzog
Fabian,Molina
Fabien,Fivaz
Fabio,Regazzi
Felix,Wettstein
Flavia,Wasserfallen
Florence,Brenzikofer
François,Pointet
Franz Josef,Grüter
Franziska,Roth
Franziska,Ryser
Frédéric,Borloz
Gabriela,Suter
Gerhard,Andrey
Gerhard,Pfister
Gregor A.,Rutz
Greta,Gysin
Hannes,Germann
Hans-Peter,Portmann
Hans-Ueli,Vogt
Hans,Stöckli
Hans,Wicki
Hansjörg,Knecht
Heidi,Z['’]?graggen
Heinz,Siegenthaler
Ida,Glanzmann-Hunkeler
Irène,Kälin
Isabelle,Chassot
Isabelle,Moret
Isabelle,Pasquier-Eichenberger
Jacqueline,Badran
Jacqueline,de Quattro
Jacques,Bourgeois
Jacques,Nicolet
Jakob,Stark
Jean-Luc,Addor
Jean-Paul,Gschwind
Jean-Pierre,Grin
Johanna,Gapany
Jon,Pult
Jörg,Mäder
Josef,Dittli
Judith,Bellaiche
Jürg,Grossen
Katharina,Prelicz-Huber
Kathrin,Bertschy
Katja,Christ
Kilian,Baumann
Kurt,Egger
Kurt,Fluri
Lars,Guggisberg
Laurence,Fehlmann Rielle
Laurent,Wehrli
Leo,Müller
Léonore,Porchet
Lilian,Studer
Lisa,Mazzone
Lorenz,Hess
Lorenzo,Quadri
Lukas,Reimann
Magdalena,Martullo-Blocher
Maja,Riniker
Manuel,Strupler
Manuela,Weichelt
Marcel,Dettling
Marcel,Dobler
Marco,Chiesa
Marco,Romano
Marianne,Binder-Keller
Marianne,Maret
Marianne,Streiff-Feller
Marie-France,Roth Pasquier
Marina,Carobbio Guscetti
Marionna,Schlatter
Markus,Ritter
Martin,Bäumle
Martin,Candinas
Martin,Haab
Martin,Landolt
Martin,Schmid
Martina,Bircher
Martina,Munz
Mathias,Zopfi
Mattea,Meyer
Matthias Samuel,Jauslin
Matthias,Aebischer
Matthias,Michel
Mauro,Tuena
Maya,Graf
Melanie,Mettler
Meret,Schneider
Michaël,Buffat
Michael,Graber
Michael,Töngi
Michel,Matter
Mike,Egger
Min Li,Marti
Monika,Rüegger
Mustafa,Atici
Nadine,Masshardt
Nadja,Umbricht Pieren
Nicolas,Walder
Nicolo,Paganini
Nik,Gugger
Niklaus-Samuel,Gugger
Olivier,Feller
Olivier,Français
Othmar,Reichmuth
Patricia,von Falkenstein
Paul,Rechsteiner
Peter,Hegglin
Peter,Keller
Peter,Schilliger
Petra,Gössi
Philipp Matthias,Bregy
Philipp,Kutter
Philippe,Bauer
Philippe,Nantermod
Piero,Marchesi
Pierre-Alain,Fridez
Pierre-André,Page
Pierre-Yves,Maillard
Pirmin Josef,Bischof
Pirmin,Schwander
Prisca,Birrer-Heimo
Priska,Seiler Graf
Priska,Wismer-Felder
Regine,Sauter
Regula,Rytz
Roberto,Zanetti
Rocco,Cattaneo
Roger,Köppel
Roger,Nordmann
Roland Rino,Büchel
Roland,Fischer
Ruedi,Noser
Ruth,Humbel
Samira,Marti
Samuel,Bendahan
Sandra,Locher Benguerel
Sandra,Sollberger
Sarah,Wyss
Sibel,Arslan
Sidney,Kamerzin
Simon,Stadler
Simone,de Montmollin
Sophie,Michaud Gigon
Stefan Georg,Engler
Stefan,Müller-Altermatt
Stefania,Prezioso Batou
Stefanie,Heimgartner
Susanne,Vincenz-Stauffacher
Tamara,Funiciello
Therese,Schläpfer
Thierry,Burkart
Thomas Jan,de Courten
Thomas,Aeschi
Thomas,Brunner
Thomas,Burgherr
Thomas,Hefti
Thomas,Hurter
Thomas,Matter
Thomas,Minder
Thomas,Rechsteiner
Tiana Angelina,Moser
Ursula,Schneider Schüttel
Valentine,Python
Valérie,Piller Carrard
Verena,Herzog
Vincent,Maitre
Walter,Wobmann
Werner,Salzmann
Yves,Nidegger
Yvette,Estermann
Yvonne,Feri
`);

// names from lobbyists.csv
const lobbyists = csv_to_regex_array(`
Adrian,Bühler
Adrian,Steiner
Alain,Gut
Alain,Zwygart
Alecs,Recher
Alena,Weibel
Alessandro,Della Vedova
Alex,Fischer
Alexander,Meszmer
Alexander,Segert
Alexandra,Erdin
Alfred,Aeppli
Alfred,Moret
Alice,Genoud
Aliki,Panayides
Aline Sara,Rampazzo
Anders,Gautschi
André,Kirchhofer
André,Marty
André,Vernay
Andreas,Binder
Andreas,Burgener
Andreas,Hammer
Andreas,Hugi
Andreas,Lehner
Andreas,Lustenberger
Andreas,Richner
Andreas,Wyss
Angelo,Geninazzi
Anna,De Quervain
Anna,Frey
Anne,Dousse
Annette,Walder
Annina Rahel,Grob
Ariane,Rustichelli
Armin,Menzi
Axel,Müller
Babette,Sigg Frank
Belinda,Walther Weger
Benjamin Tim,Klaus
Benoît,Cerutti
Benoît,Gaillard
Bernhard,Höneisen
Bernhard,Meier
Berno,Stoffel
Bettina Maria,Kundert
Bettina,Mutter
Brigitta,Dolder-Troller
Bruno,Dobler
Bruno,Henggi
Bruno,Perroud
Bruno,Schläpfer
Carina,Schaller
Carlo,Steiner
Carmen,Imark-Schmidhalter
Carmen,Inauen
Caroline,Abu Sa'Da
Carsten,Schmidt
Casimir,Platzer
Caspar,Bijleveld
Catherine,Rouvenaz Badoud
Cathrine,Ambrus
Céline Beatrice,Tschirky
Céline,Sutter
Che,Wagner
Chico Angelo,Koch
Christian,Neuhaus
Christian,Zünd
Christof,Dietler
Christoph,Kamber
Christoph,Merkli
Christoph,Trummer
Christophe,Hans
Claudio,Kuster
Cornelia,Stamm Hurter
Cristina Maria,Zanini Barzaghi
Cynthia,Lang
Dagmar,Rösler
Daniel Noël,Bulliard
Daniel,Borner
Daniel,Lampart
Daniel,Piazza
Daniel,Wiener
David Michael,Schenker
David,Cornut
David,Herzig
David,Ruetschi
David,Stickelberger
David,Trachsel
Diego,Baratti
Dina,Spörri
Dominik,Gross
Dominik,Rohrer
Dominik,Waser
Dominique,Martin
Dorothea,Aebi-Keller
Elena Antonella,Strozzi
Elias,Bricker
Elias,Maier
Elias,Meier
Emilie,Graff
Eric,Lecoultre
Erich,Heynen
Erich,Tschirky
Ernest,Geiser
Etienne,Bütikofer
Etrit,Hasler
Eva,Schmassmann
Eveline,Rechsteiner
Fabian,Frauenfelder
Fabienne,Thomas
Fabio,Gassmann
Felix Michael,Wirz
Felix,Ruppen
Felix,Schneuwly
Flavia,Canali
Florence,Schurch
Floriane,Kaiser
Francis,Egger
Franco Eugenio,Denti
François,Turrian
Frank,Furrer
Franz,Egle
Franziska,Lenz
Freddy,Moret
Gabriel,Fischer
Gabriel,Rumo
Gabriela,Medici
Gallus,Cadonau
Georg,Umbricht
Georges,Zünd
Gérald,Nicod
Gian,Brun
Giorgio,Tuti
Gottfried,Locher
Guido,Graf
Hannes,Hui
Hans Jörg,Rüegsegger
Hans-Peter,Wüthrich
Hanspeter,Hohl
Harry,Graf
Heinrich,Minder
Helen,Fässler-Eiermann
Hélène,Noirjean
Henrique,Schneider
Hilmar,Gernet
Jacopo,Canova
Jan,Bumann
Jan,Gnägi
Jan,Mühlethaler
Janina,Aeberhard
Jean-Félix,Savary
Jérôme,Hayoz
Johanna,Bundi Ryser
Johannes,Schwarz
Jonas,Glanzmann
Josef,Bollag
Judith Lisa,Hanhart
Jules,Aubert
Julien Boris,Neruda
Julien,Repond
Jürg,Aschwanden
Jürg,Maurer
Jürg,Staudenmann
Károly Christian,Köpe
Karoly,Köpe
Kathy,Steiner
Kevin,Grangier
Konrad,Studerus
Kristina,Lanz
Kurt Heinrich,Zollinger
Kurt,Gfeller
Laetitia,Bettex
Laura,Kopp
Lelia,Hunziker
Linda,Strupler
Lisa,Vincenz
Livia Salome,Aeschbach-Jauslin
Lorenz,Furrer
Louis,Perron
Luc,Leumann
Luc,Thomas
Luca,Boog
Lucius,Dürr
Lukas,Aecherli
Lukas,Wegmüller
Luzia,Grüter-Bucher
Luzian,Franzini
Magali,Corpataux
Manuel,Graf
Marc,Vetterli
Marcel,Durst
Marcel,Kreber
Marcel,Liner
Marcel,Sennhauser
Marcia,Cerantola
Marco,Grüter
Marco,Taddei
Margret,Wasserfallen
Maria Luisa,Bernini Burkhard
Martin,Bossard
Martin,Dätwyler
Martin,Kaiser
Martin,Kuonen
Martin,Leschhorn Strebel
Martin,Rufer
Martina Teresa,Würth
Martina,Novak
Martina,Vieli
Martine,Cottier-Chassot
Massimo,Suter
Matthias P.A.,Müller
Matthias,Dietrich
Matthias,Hui
Matthias,Humbel
Max,Hofmann
Michael Johann,Frank
Michael,Bützer
Michael,Felber
Michael,Fust
Michael,Geissbühler
Michael,Ineichen
Michael,Schmid
Michel Sandro,Grunder
Michel,Rudin
Michela,Trisconi
Michèle,Andermatt
Micole,Gotti
Mike,Bacher
Milco,Margaroli
Miriam,Gurtner (Dagai)
Monika,Lienert
Muriel,Waeger
Nadine,Aebischer
Natalie,Imboden
Nello,Castelli
Nicola Manuel,Forster
Nicola,Goepfert
Nicolas,Reymond
Nicole Caroline,Beutler
Nicole,Cornu
Niklaus,Wepfer
Nils,Epprecht
Noémi,Weber
Océane,Dayer
Oleg,Gafner
Olivier,Fantino
Olivier,Mark
Pascal,Olivier
Patrick Olivier,Eperon
Patrick,Hofstetter
Patrick,Mayer
Patrizia,Lehmann
Paul Robert,Waldmann
Paul,Mori
Pentti,Aellig
Peter Alois,Metzinger
Peter Eugen Seraphin,Saxenhofer
Peter,Hug
Peter,Meier
Philip Holmgaard,Kristensen
Philipp,Mäder
Philipp,Niederberger
Philippe David Martin,Kühni
Philippe,Miauton
Philippe,Zahno
Pierre,Zwahlen
Raimund,Rodewald
Raphaël,Bez
Rebecca,Joly
Regula,Bühlmann
Remco André,Giovanoli
Renate,Hotz Schläpfer
René,Jenny
René,Rall
Reto,Jaussi
Reto,Vincenz
Reto,Wiesli
Reto,Wyss
Robin,Eymann
Robin,Quartier
Roger,Hegi
Roger,Kunz
Roland A.,Müller
Romain,Dubois
Roman Jürg,Fischer
Roman,Heggli
Roman,Weissen
Romano,Amacker
Ronny,Kaufmann
Rosmarie,Salzmann
Rudolf,Guggisberg
Rudolf,Horber
Ruedi,Horber
Sacra,Tomisawa
Samuel,Rohrbach
Sara,Stalder
Sarah-Lee,Keller
Sarkis,Shahinian
Sébastien,Leprat
Silas,Hobi
Silvan,Lipp
Simon,Banholzer
Simon,Binder
Simon,Gisler
Simon,Zurich
Simona,Kobel
Simone,Eggler
Sonja,Steinmann
Sophie,Achermann
Sophie,Haenni
Soren Bo,Henrichsen
Stefan Michael,Nünlist
Stefan,Batzli
Stefan,Brupbacher
Stefan,Flückiger
Stefan,Jakob
Stefan,Kilchenmann
Stefan,Kunz
Stefan,Vannoni
Stefano,Kunz
Stephan,Pauli
Sue,Putallaz
Tatiana,Rezso
Thomas Christian,Berger
Thomas,Borer
Thomas,Kähr
Timotheus,Bruderer
Tobias Simon,Vögeli
Tobias,König
Ueli,Stückelberger
Ulrich Rudolf,Frei
Ulrich,Keller
Urban,Hodel
Urs Andreas,Hofstetter
Urs,Helfenstein
Urs,Schneider
Urs,Vögeli
Valentin,Vogt
Valérie,Borioli Sandoz
Vanessa,Jenni-Lincoln
Vania,Alleva
Varuna,Singh Auroi
Verio Dante,Pini
Walter,Stüdeli
Werner,Gartenmann
Xavier,Bertelletto
Yael,Bloch
Yves Samuel,Weidmann
Yvonne,Ribi
`);

// function to recursively tag all matching names using a span and finally returning total number of matches
function highlight(element) {
    var res = 0;
    var nodes = element.childNodes;
    for (var i = nodes.length; i-- > 0;) {
        const e = nodes[i];
        if (e.nodeType === 3) {
            for (var k = 2; k-- > 0;) {
                var re = new RegExp([parlamentarians, lobbyists][k], 'gi');
                const lwClass = k === 0 ? 'lw-parliamentarian' : 'lw-lobbyist';
                var match;
                var matches = [];
                while (match = re.exec(e.data))
                    matches.push(match);
                for (var j = matches.length; j-- > 0;) {
                    match = matches[j];
                    var newNode = document.createElement("span");
                    newNode.classList.add(lwClass);
                    newNode.classList.add('lw-person');
                    newNode.textContent = match[0];
                    e.splitText(match.index);
                    e.nextSibling.splitText(match[0].length);
                    e.parentNode.replaceChild(newNode, e.nextSibling);
                    res++;
                }
            }
        } else if (e.nodeType === 1 && e.tagName.toLowerCase() === 'span' && e.classList.contains('lw-person')) {
            // empty to stop repeated nested tagging when running the highlighting multiple times
            res++;
        } else if (e.nodeType === 1 && e.tagName.toLowerCase() === 'script') {
            // don't descend into scripts
        } else {
            res += highlight(e);  // Not a text node or leaf, so check it's children
        }
    }
    return res;
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg === 'ping') {
        sendResponse(true);
    } else if (msg === 'match') {
        // FIXME find some way to remember if highlighting was performed already since last change
        // maybe using MutationObserver API
        // see https://stackoverflow.com/questions/61314922/mutationobserver-not-picking-up-on-child-nodes
        // possibly to be performed as side-effect of highlight() function
        const matchCount = highlight(document.body);
        sendResponse(matchCount);
    } else if (msg === 'details') {
        let elements = Array.from(document.getElementsByClassName('lw-person'));
        sendResponse(elements.map(e => e.textContent));
    }
});
