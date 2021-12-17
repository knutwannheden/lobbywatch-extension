function csv_to_regex_array(csv) {
    return '\\b' + csv
        .split(/\r?\n\s*/)
        .filter(n => n.length > 0)
        .map(n => n.replace('Delphine', 'Délphine'))
        .map(n => n.replace('Bellaiche', 'Bellaïche'))
        .map(n => n.replace(/é/, '[eé]'))
        .map(n => n.replace(/è/, '[eè]'))
        .map(n => n.replace(/à/, '[aà]'))
        .map(n => n.replace(/ï/, '[iï]'))
        .map(n => n.split(','))
        .filter(n => n.length === 4)
        .map(n => {
            if ((i = n[2].search(/[- ]/)) !== -1)
                n[2] = n[2].replace(/[- ](.*)/, '([- ]$1)?');
            return n;
        })
        .map((n) => {
            let result = '(?<_' + n[3] + '>';
            if ((i = n[0].indexOf(' ')) === -1)
                result += n[0] + '\\s*' + n[2] + '|' + n[2] + ',?\\s*' + n[0];
            else
                result += n[0].substring(0, i) + '(?:' + n[0].substring(i) + ')?\\s*' + n[2] + '|'
                    + n[2] + ',?\\s*' + n[0].substring(0, i) + '(?:' + n[0].substring(i) + ')?';
            if (n[1])
                result += '|' + n[1] + '\\s*' + n[2] + '|' + n[2] + ',?\\s*' + n[1];
            return result + ')';
        })
        .join('|') + '\\b';
}

// names from parlamentarians.csv
const parlamentarians = csv_to_regex_array(`
Ada,,Marra,143
Adèle,,Thorens Goumaz,196
Albert,,Rösti,180
Alex,,Farinelli,393
Alex,,Kuprecht,34
Alfred,,Heer,116
Aline,,Trede,198
Alois,,Gmür,99
Alois,,Huber,425
Andrea Martina,,Geissbühler,93
Andrea,,Caroni,66
Andrea,,Gmür-Schönenberger,284
Andreas,,Aebi,39
Andreas,,Gafner,376
Andreas,,Glarner,283
Andri,,Silberschmidt,353
Angelo,,Barrile,265
Anna,,Giacometti,374
Balthasar,,Glättli,98
Baptiste,,Hurni,398
Barbara,,Gysi,110
Barbara,,Schaffner,418
Barbara,,Steinemann,306
Bastien,,Girod,96
Beat,,Flach,83
Beat,,Rieder,319
Beat,,Walti,251
Benedikt,,Würth,345
Benjamin,,Giezendanner,360
Benjamin,,Roduit,331
Brigitte,,Crottaz,330
Brigitte,,Häberli-Koller,228
Bruno,,Storni,420
Bruno,,Walliser,309
Carlo,,Sommaruga,192
Cédric,,Wermuth,211
Céline Marie-Claire,,Amaudruz,44
Céline,,Vara,421
Céline,,Weber,431
Céline,,Widmer,366
Charles,,Juillard,402
Christa,,Markwalder,142
Christian Arnaud,,Lüscher,137
Christian,,Dandrès,389
Christian,,Imark,289
Christian,,Lohr,14
Christian,,Wasserfallen,210
Christine,,Badertscher,355
Christine,,Bulliard-Marbach,63
Christophe,,Clivaz,383
Claudia,,Friedl,89
Corina,,Gredig,348
Damian,,Müller,318
Damien,,Cottier,388
Daniel Karl,,Fässler,76
Daniel Reuwen,,Jositsch,125
Daniel,,Brélaz,269
Daniela,,Schneeberger,21
David,,Zuberbühler,312
Delphine,,Klopfenstein Broggini,403
Denis,,de la Reussille,276
Diana,,Gutjahr,328
Doris,,Fiala,81
Edith,,Graf-Litscher,103
Elisabeth,,Baume-Schneider,401
Elisabeth,,Schneider-Schneiter,188
Emmanuel,,Amoos,428
Eric,,Nussbaumer,161
Erich,,Ettlin,316
Erich,,Hess,287
Erich,,von Siebenthal,206
Esther,,Friedli,356
Eva,,Herzog,382
Fabian,,Molina,332
Fabien,,Fivaz,395
Fabio,,Regazzi,171
Felix,,Wettstein,354
Flavia,,Wasserfallen,335
Florence,,Brenzikofer,424
François,,Pointet,409
Franz Josef,,Grüter,285
Franziska,,Roth,416
Franziska,,Ryser,346
Frédéric,,Borloz,268
Gabriela,,Suter,370
Gerhard,,Andrey,371
Gerhard,,Pfister,166
Gregor A.,,Rutz,182
Greta,,Gysin,396
Hannes,,Germann,227
Hans-Peter,,Portmann,248
Hans-Ueli,,Vogt,308
Hans,,Stöckli,38
Hans,,Wicki,321
Hansjörg,,Knecht,131
Heidi,,Z'graggen,352
Heinz,,Siegenthaler,256
Ida,,Glanzmann-Hunkeler,97
Irène,,Kälin,329
Isabelle,,Chassot,429
Isabelle,,Moret,15
Isabelle,,Pasquier-Eichenberger,408
Jacqueline,,Badran,49
Jacqueline,,de Quattro,392
Jacques,,Bourgeois,57
Jacques,,Nicolet,298
Jakob,,Stark,384
Jean-Luc,,Addor,261
Jean-Paul,,Gschwind,108
Jean-Pierre,,Grin,104
Johanna,,Gapany,381
Jon,,Pult,378
Jörg,,Mäder,359
Josef,,Dittli,315
Judith,,Bellaiche,362
Jürg,,Grossen,106
Katharina,,Prelicz-Huber,411
Kathrin,,Bertschy,53
Katja,,Christ,369
Kilian,,Baumann,358
Kurt,,Egger,375
Kurt,,Fluri,85
Lars,,Guggisberg,391
Laurence,,Fehlmann Rielle,280
Laurent,,Wehrli,310
Leo,,Müller,149
Léonore,,Porchet,410
Lilian,,Studer,372
Lisa,,Mazzone,295
Lorenz,,Hess,11
Lorenzo,,Quadri,170
Lukas,,Reimann,172
Magdalena,,Martullo-Blocher,294
Maja,,Riniker,415
Manuel,,Strupler,387
Manuela,,Weichelt,386
Marcel,,Dettling,277
Marcel,,Dobler,278
Marco,,Chiesa,275
Marco,,Romano,179
Marianne,,Binder-Keller,364
Marianne,,Maret,406
Marianne,,Streiff-Feller,195
Marie-France,,Roth Pasquier,417
Marina,,Carobbio Guscetti,4
Marionna,,Schlatter,349
Markus,,Ritter,178
Martin,,Bäumle,51
Martin,,Candinas,65
Martin,,Haab,343
Martin,,Landolt,132
Martin,,Schmid,242
Martina,,Bircher,373
Martina,,Munz,154
Mathias,,Zopfi,380
Mattea,,Meyer,296
Matthias Samuel,,Jauslin,314
Matthias,,Aebischer,40
Matthias,,Michel,400
Mauro,,Tuena,307
Maya,,Graf,102
Melanie,,Mettler,357
Meret,,Schneider,350
Michaël,,Buffat,270
Michael,,Graber,427
Michael,,Töngi,334
Michel,,Matter,407
Mike,,Egger,341
Min Li,,Marti,293
Monika,,Rüegger,379
Mustafa,,Atici,368
Nadine,,Masshardt,144
Nadja,,Umbricht Pieren,167
Nicolas,,Walder,422
Nicolo,,Paganini,333
Niklaus-Samuel,Nik,Gugger,327
Olivier,,Feller,79
Olivier,,Français,86
Othmar,,Reichmuth,423
Patricia,,von Falkenstein,430
Paul,,Rechsteiner,36
Peter,,Hegglin,317
Peter,,Keller,127
Peter,,Schilliger,185
Petra,,Gössi,101
Philipp Matthias,,Bregy,340
Philipp,,Kutter,337
Philippe,,Bauer,266
Philippe,,Nantermod,297
Piero,,Marchesi,405
Pierre-Alain,,Fridez,88
Pierre-André,,Page,299
Pierre-Yves,,Maillard,351
Pirmin Josef,,Bischof,219
Pirmin,,Schwander,190
Prisca,,Birrer-Heimo,55
Priska,,Seiler Graf,304
Priska,,Wismer-Felder,363
Regine,,Sauter,302
Regula,,Rytz,183
Roberto,,Zanetti,246
Rocco,,Cattaneo,326
Roger,,Köppel,291
Roger,,Nordmann,159
Roland Rino,,Büchel,60
Roland,,Fischer,82
Ruedi,,Noser,160
Ruth,,Humbel,12
Samira,,Marti,339
Samuel,,Bendahan,323
Sandra,,Locher Benguerel,397
Sandra,,Sollberger,305
Sarah,,Wyss,426
Sibel,,Arslan,264
Sidney,,Kamerzin,399
Simon,,Stadler,419
Simone,,de Montmollin,390
Sophie,,Michaud Gigon,367
Stefan Georg,,Engler,223
Stefan,,Müller-Altermatt,153
Stefania,,Prezioso Batou,412
Stefanie,,Heimgartner,394
Susanne,,Vincenz-Stauffacher,361
Tamara,,Funiciello,347
Therese,,Schläpfer,344
Thierry,,Burkart,273
Thomas Jan,,de Courten,6
Thomas,,Aeschi,41
Thomas,,Brunner,365
Thomas,,Burgherr,272
Thomas,,Hefti,230
Thomas,,Hurter,120
Thomas,,Matter,250
Thomas,,Minder,238
Thomas,,Rechsteiner,414
Tiana Angelina,,Moser,147
Ursula,,Schneider Schüttel,187
Valentine,,Python,413
Valérie,,Piller Carrard,168
Verena,,Herzog,117
Vincent,,Maitre,404
Walter,,Wobmann,212
Werner,,Salzmann,301
Yves,,Nidegger,158
Yvette,,Estermann,75
Yvonne,,Feri,80
`);

// names from lobbyists.csv
const lobbyists = csv_to_regex_array(`
Adrian,,Bühler,516
Adrian,,Steiner,458
Alain,,Gut,799
Alain,,Zwygart,866
Alecs,,Recher,837
Alena,,Weibel,438
Alessandro,,Della Vedova,841
Alex,,Fischer,69
Alexander,,Meszmer,880
Alexander,,Segert,145
Alexandra,,Erdin,940
Alfred,,Aeppli,258
Alfred,Freddy,Moret,568
Alice,,Genoud,924
Aliki,,Panayides,155
Aline Sara,,Rampazzo,514
Anders,,Gautschi,850
André,,Kirchhofer,512
André,,Marty,919
André,,Vernay,528
Andreas,,Binder,853
Andreas,,Burgener,245
Andreas,,Hammer,428
Andreas,,Hugi,348
Andreas,,Lehner,874
Andreas,,Lustenberger,927
Andreas,,Richner,579
Andreas,,Wyss,597
Angelo,,Geninazzi,201
Anna,,De Quervain,970
Anna,,Frey,829
Anne,,Dousse,803
Annette,,Walder,306
Annina Rahel,,Grob,684
Ariane,,Rustichelli,408
Armin,,Menzi,305
Axel,,Müller,619
Babette,,Sigg Frank,175
Belinda,,Walther Weger,407
Benjamin Tim,,Klaus,939
Benoît,,Cerutti,888
Benoît,,Gaillard,859
Bernhard,,Höneisen,681
Bernhard,,Meier,246
Berno,,Stoffel,931
Bettina Maria,,Kundert,943
Bettina,,Mutter,96
Brigitta,,Dolder-Troller,544
Bruno,,Dobler,833
Bruno,,Henggi,146
Bruno,,Perroud,494
Bruno,,Schläpfer,725
Carina,,Schaller,694
Carlo,,Steiner,852
Carmen,,Imark-Schmidhalter,616
Carmen,,Inauen,896
Caroline,,Abu Sa'Da,828
Carsten,,Schmidt,857
Casimir,,Platzer,513
Caspar,,Bijleveld,933
Catherine,,Rouvenaz Badoud,611
Cathrine,,Ambrus,892
Céline Beatrice,,Tschirky,961
Céline,,Sutter,824
Che,,Wagner,921
Chico Angelo,,Koch,910
Christian,,Neuhaus,836
Christian,,Zünd,608
Christof,,Dietler,120
Christoph,,Kamber,941
Christoph,,Merkli,60
Christoph,,Trummer,461
Christophe,,Hans,467
Claudio,,Kuster,176
Cornelia,,Stamm Hurter,150
Cristina Maria,,Zanini Barzaghi,930
Cynthia,,Lang,960
Dagmar,,Rösler,887
Daniel Noël,,Bulliard,90
Daniel,,Borner,332
Daniel,,Lampart,230
Daniel,,Piazza,897
Daniel,,Wiener,317
David Michael,,Schenker,907
David,,Cornut,865
David,,Herzig,592
David,,Ruetschi,862
David,,Stickelberger,84
David,,Trachsel,958
Diego,,Baratti,920
Dina,,Spörri,913
Dominik,,Gross,526
Dominik,,Rohrer,574
Dominik,,Waser,877
Dominique,,Martin,593
Dorothea,,Aebi-Keller,929
Elena Antonella,,Strozzi,204
Elias,,Bricker,823
Elias,,Maier,622
Elias,,Meier,831
Emilie,,Graff,832
Eric,,Lecoultre,906
Erich,,Heynen,898
Erich,,Tschirky,21
Ernest,,Geiser,334
Etienne,,Bütikofer,68
Etrit,,Hasler,848
Eva,,Schmassmann,437
Eveline,,Rechsteiner,817
Fabian,,Frauenfelder,690
Fabienne,,Thomas,851
Fabio,,Gassmann,714
Felix Michael,,Wirz,95
Felix,,Ruppen,879
Felix,,Schneuwly,381
Flavia,,Canali,878
Florence,,Schurch,149
Floriane,,Kaiser,916
Francis,,Egger,85
Franco Eugenio,,Denti,508
François,,Turrian,964
Frank,,Furrer,549
Franz,,Egle,384
Franziska,,Lenz,641
Gabriel,,Fischer,426
Gabriel,,Rumo,915
Gabriela,,Medici,846
Gallus,,Cadonau,141
Georg,,Umbricht,816
Georges,,Zünd,550
Gérald,,Nicod,555
Gian,,Brun,937
Giorgio,,Tuti,392
Gottfried,,Locher,864
Guido,,Graf,294
Hannes,,Hui,903
Hans Jörg,,Rüegsegger,448
Hans-Peter,,Wüthrich,523
Hanspeter,,Hohl,804
Harry,,Graf,298
Heinrich,,Minder,239
Helen,,Fässler-Eiermann,447
Hélène,,Noirjean,922
Henrique,,Schneider,283
Hilmar,,Gernet,573
Jacopo,,Canova,719
Jan,,Bumann,863
Jan,,Gnägi,947
Jan,,Mühlethaler,18
Janina,,Aeberhard,950
Jean-Félix,,Savary,266
Jérôme,,Hayoz,965
Johanna,,Bundi Ryser,640
Johannes,,Schwarz,227
Jonas,,Glanzmann,126
Josef,,Bollag,187
Judith Lisa,,Hanhart,805
Jules,,Aubert,801
Julien Boris,,Neruda,679
Julien,,Repond,902
Jürg,,Aschwanden,489
Jürg,,Maurer,183
Jürg,,Staudenmann,554
Károly Christian,Karoly,Köpe,301
Kathy,,Steiner,808
Kevin,,Grangier,425
Konrad,,Studerus,195
Kristina,,Lanz,753
Kurt Heinrich,,Zollinger,670
Kurt,,Gfeller,353
Laetitia,,Bettex,867
Laura,,Kopp,648
Lelia,,Hunziker,822
Linda,,Strupler,936
Lisa,,Vincenz,827
Livia Salome,,Aeschbach-Jauslin,567
Lorenz,,Furrer,190
Louis,,Perron,50
Luc,,Leumann,347
Luc,,Thomas,566
Luca,,Boog,971
Lucius,,Dürr,22
Lukas,,Aecherli,932
Lukas,,Wegmüller,624
Luzia,,Grüter-Bucher,519
Luzian,,Franzini,854
Magali,,Corpataux,542
Manuel,,Graf,228
Marc,,Vetterli,946
Marcel,,Durst,318
Marcel,,Kreber,128
Marcel,,Liner,371
Marcel,,Sennhauser,163
Marcia,,Cerantola,855
Marco,,Grüter,909
Marco,,Taddei,32
Margret,,Wasserfallen,243
Maria Luisa,,Bernini Burkhard,167
Martin,,Bossard,517
Martin,,Dätwyler,316
Martin,,Kaiser,952
Martin,,Kuonen,89
Martin,,Leschhorn Strebel,942
Martin,,Rufer,142
Martina Teresa,,Würth,689
Martina,,Novak,697
Martina,,Vieli,609
Martine,,Cottier-Chassot,972
Massimo,,Suter,966
Matthias P.A.,,Müller,963
Matthias,,Dietrich,81
Matthias,,Hui,886
Matthias,,Humbel,835
Max,,Hofmann,399
Michael Johann,,Frank,602
Michael,,Bützer,905
Michael,,Felber,917
Michael,,Fust,493
Michael,,Geissbühler,584
Michael,,Ineichen,918
Michael,,Schmid,284
Michel Sandro,,Grunder,908
Michel,,Rudin,807
Michela,,Trisconi,356
Michèle,,Andermatt,872
Micole,,Gotti,926
Mike,,Bacher,312
Milco,,Margaroli,667
Miriam,,Gurtner (Dagai),527
Monika,,Lienert,510
Muriel,,Waeger,856
Nadine,,Aebischer,904
Natalie,,Imboden,691
Nello,,Castelli,570
Nicola Manuel,,Forster,578
Nicola,,Goepfert,871
Nicolas,,Reymond,815
Nicole Caroline,,Beutler,557
Nicole,,Cornu,957
Niklaus,,Wepfer,956
Nils,,Epprecht,712
Noémi,,Weber,860
Océane,,Dayer,695
Oleg,,Gafner,843
Olivier,,Fantino,735
Olivier,,Mark,802
Pascal,,Olivier,876
Patrick Olivier,,Eperon,234
Patrick,,Hofstetter,125
Patrick,,Mayer,478
Patrizia,,Lehmann,821
Paul Robert,,Waldmann,891
Paul,,Mori,727
Pentti,,Aellig,973
Peter Alois,,Metzinger,884
Peter Eugen Seraphin,,Saxenhofer,376
Peter,,Hug,959
Peter,,Meier,701
Philip Holmgaard,,Kristensen,287
Philipp,,Mäder,935
Philipp,,Niederberger,955
Philippe David Martin,,Kühni,928
Philippe,,Miauton,500
Philippe,,Zahno,553
Pierre,,Zwahlen,396
Raimund,,Rodewald,214
Raphaël,,Bez,666
Rebecca,,Joly,901
Regula,,Bühlmann,488
Remco André,,Giovanoli,613
Renate,,Hotz Schläpfer,123
René,,Jenny,617
René,,Rall,251
Reto,,Jaussi,479
Reto,,Vincenz,826
Reto,,Wiesli,117
Reto,,Wyss,662
Robin,,Eymann,890
Robin,,Quartier,687
Roger,,Hegi,530
Roger,,Kunz,731
Roland A.,,Müller,366
Romain,,Dubois,900
Roman Jürg,,Fischer,738
Roman,,Heggli,704
Roman,,Weissen,218
Romano,,Amacker,954
Ronny,,Kaufmann,35
Rosmarie,,Salzmann,797
Rudolf,,Guggisberg,809
Rudolf,Ruedi,Horber,121
Sacra,,Tomisawa,659
Samuel,,Rohrbach,945
Sara,,Stalder,83
Sarah-Lee,,Keller,870
Sarkis,,Shahinian,97
Sébastien,,Leprat,653
Silas,,Hobi,842
Silvan,,Lipp,669
Simon,,Banholzer,858
Simon,,Binder,885
Simon,,Gisler,962
Simon,,Zurich,709
Simona,,Kobel,868
Simone,,Eggler,656
Sonja,,Steinmann,834
Sophie,,Achermann,699
Sophie,,Haenni,812
Soren Bo,,Henrichsen,911
Stefan Michael,,Nünlist,406
Stefan,,Batzli,349
Stefan,,Brupbacher,844
Stefan,,Flückiger,736
Stefan,,Jakob,137
Stefan,,Kilchenmann,136
Stefan,,Kunz,390
Stefan,,Vannoni,80
Stefano,,Kunz,663
Stephan,,Pauli,934
Sue,,Putallaz,861
Tatiana,,Rezso,951
Thomas Christian,,Berger,487
Thomas,,Borer,439
Thomas,,Kähr,424
Timotheus,,Bruderer,603
Tobias Simon,,Vögeli,923
Tobias,,König,899
Ueli,,Stückelberger,237
Ulrich Rudolf,,Frei,518
Ulrich,,Keller,253
Urban,,Hodel,840
Urs Andreas,,Hofstetter,925
Urs,,Helfenstein,498
Urs,,Schneider,387
Urs,,Vögeli,506
Valentin,,Vogt,314
Valérie,,Borioli Sandoz,533
Vanessa,,Jenni-Lincoln,540
Vania,,Alleva,552
Varuna,,Singh Auroi,330
Verio Dante,,Pini,677
Walter,,Stüdeli,130
Werner,,Gartenmann,682
Xavier,,Bertelletto,286
Yael,,Bloch,723
Yves Samuel,,Weidmann,728
Yvonne,,Ribi,304
`);

// function to recursively tag all matching names using a span
function highlight(element, matches) {
    let nodes = element.childNodes;
    for (var i = nodes.length; i-- > 0;) {
        const e = nodes[i];
        if (e.nodeType === 3) {
            for (var k = 2; k-- > 0;) {
                var re = new RegExp([parlamentarians, lobbyists][k], 'gid');
                const lwClass = k === 0 ? 'lw-parliamentarian' : 'lw-lobbyist';
                let match;
                let localMatches = [];
                while (match = re.exec(e.data)) {
                    localMatches.push(match);
                }
                for (var j = localMatches.length; j-- > 0;) {
                    match = localMatches[j];
                    let span = document.createElement("span");
                    span.classList.add(lwClass);
                    span.classList.add('lw-person');
                    const id = Object.entries(match.groups).find(([k, v]) => v)[0].substring(1);
                    span.setAttribute('data-lw', matches.length + ';' + id);
                    span.textContent = match[0];
                    e.splitText(match.index);
                    e.nextSibling.splitText(match[0].length);
                    e.parentNode.replaceChild(span, e.nextSibling);
                    matches.push(span);
                    console.log(span);
                }
            }
        } else if (e.nodeType === 1 && e.tagName.toLowerCase() === 'span' && e.hasAttribute('data-lw')) {
            // empty to stop repeated nested tagging when running the highlighting multiple times
            console.log(e);
            let dataLw = e.getAttribute('data-lw');
            // set data-lw attribute again in case DOM was changed
            if (!dataLw.startsWith(matches.length + ';')) {
                e.setAttribute('data-lw', matches.length + dataLw.substring(dataLw.indexOf(';')));
            }
            matches.push(e);
        } else if (e.nodeType === 1 && ['script', 'style'].includes(e.tagName.toLowerCase())) {
            // don't descend into JavaScript and CSS
        } else {
            highlight(e, matches);  // Not a text node or leaf, so check it's children
        }
    }
};

function unselectElement(element) {
    while (element && element.classList) {
        element.classList.remove('lw-selected');
        element = element.parentNode;
    }
}

function selectElement(element) {
    element.classList.add('lw-selected');
    element.scrollIntoViewIfNeeded();

    if (element.offsetParent === null) {
        while (element && element.offsetParent === null) {
            element = element.parentNode;
        }
        element.classList.add('lw-selected');
        element.scrollIntoViewIfNeeded();
    }
}

function moveSelection(dir) {
    let elements = Array.from(document.getElementsByClassName('lw-person'));
    current = elements.find(e => e.classList.contains('lw-selected'));
    var element = null;
    if (!current) {
        element = elements[0];
    } else {
        element = elements[(elements.indexOf(current) + elements.length + dir) % elements.length];
    }
    unselectElement(current);
    selectElement(element);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'ping') {
        sendResponse(true);
    } else if (msg.action === 'match') {
        // FIXME find some way to remember if highlighting was performed already since last change
        // maybe using MutationObserver API
        // see https://stackoverflow.com/questions/61314922/mutationobserver-not-picking-up-on-child-nodes
        // possibly to be performed as side-effect of highlight() function
        let matches = [];
        highlight(document.body, matches);
        sendResponse(matches.length);

        tippy('.lw-person', {
            content(reference) {
                const type = reference.classList.contains('lw-parliamentarian') ? 'parlamentarier' : 'zutrittsberechtigter';
                const id = reference.getAttribute('data-lw').substring(reference.getAttribute('data-lw').indexOf(';') + 1);
                return `<a href="https://lobbywatch.ch/de/daten/${type}/${id}">${reference.textContent}</a>`;
            },
            allowHTML: true,
            interactive: true,
            theme: 'light',
        });
    } else if (msg.action === 'get-details') {
        let elements = Array.from(document.getElementsByClassName('lw-person'));
        sendResponse(elements.map(e => { return { 'seqNr': e.getAttribute('data-lw'), 'name': e.textContent } }));
    } else if (msg.action === 'select-person-by-seq-nr') {
        unselectElement(document.querySelector("span.lw-selected"));
        selectElement(document.querySelector("span.lw-person[data-lw='" + msg.seqNr + "']"));
    } else if (msg.action === 'select-next') {
        moveSelection(1);
    } else if (msg.action === 'select-previous') {
        moveSelection(-1);
    }
});
