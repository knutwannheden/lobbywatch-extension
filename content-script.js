function csv_to_regex_array(csv) {
    return '\\b(?:' + csv
        .split(/\r?\n\s*/)
        .filter(n => n.length > 0)
        .map(n => n.replace('Delphine', 'Délphine'))
        .map(n => n.replace('Bellaiche', 'Bellaïche'))
        .map(n => n.replace(/à/, '[aà]'))
        .map(n => n.replace(/á/, '[aá]'))
        .map(n => n.replace(/ç/, '[cç]'))
        .map(n => n.replace(/é/, '[eé]'))
        .map(n => n.replace(/è/, '[eè]'))
        .map(n => n.replace(/ë/, '[eë]'))
        .map(n => n.replace(/ï/, '[iï]'))
        .map(n => n.replace(/î/, '[iî]'))
        .map(n => n.replace(/ò/, '[oò]'))
        .map(n => n.replace(/ô/, '[oô]'))
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
        .join('|') + ')\\b';
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
Benjamin,,Fischer,432
Benjamin,,Giezendanner,360
Benjamin,,Roduit,331
Brigitte Maria,,Häberli-Koller,228
Brigitte,,Crottaz,330
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
Christophe Charles,,Clivaz,383
Claudia,,Friedl,89
Corina,,Gredig,348
Damian,,Müller,318
Damien Jacques André,,Cottier,388
Daniel Karl,,Fässler,76
Daniel Reuwen,,Jositsch,125
Daniela,,Schneeberger,21
David,,Zuberbühler,312
Delphine,,Klopfenstein Broggini,403
Denis,,de la Reussille,276
Diana,,Gutjahr,328
Doris Yvonne,,Fiala,81
Edith,,Graf-Litscher,103
Elisabeth,,Baume-Schneider,401
Elisabeth,,Schneider-Schneiter,188
Emmanuel Didier,,Amoos,428
Eric,,Nussbaumer,161
Erich Ernst,,Ettlin,316
Erich,,Hess,287
Erich,,von Siebenthal,206
Esther Barbara,,Friedli,356
Eva Maria,,Herzog,382
Fabian,,Molina,332
Fabien,,Fivaz,395
Fabio,,Regazzi,171
Felix,,Wettstein,354
Flavia,,Wasserfallen,335
Florence Denise,,Brenzikofer,424
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
Hans,,Stöckli,38
Hans,,Wicki,321
Hansjörg,,Knecht,131
Heidi,,Z'graggen,352
Heinz,,Siegenthaler,256
Ida Michaela,,Glanzmann-Hunkeler,97
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
Jean-Paul Joseph,,Gschwind,108
Jean-Pierre,,Grin,104
Johanna Maeva,,Gapany,381
Jon Andri,,Pult,378
Jörg,,Mäder,359
Josef,,Dittli,315
Judith,,Bellaiche,362
Jürg,,Grossen,106
Katharina,,Prelicz-Huber,411
Kathrin Elisabeth,,Bertschy,53
Katja,,Christ,369
Kilian,,Baumann,358
Kurt,,Egger,375
Kurt,,Fluri,85
Lars Patrick,,Guggisberg,391
Laurence,,Fehlmann Rielle,280
Laurent,,Wehrli,310
Leo,,Müller,149
Léonore,,Porchet,410
Lilian,,Studer,372
Lisa,,Mazzone,295
Lorenz Linus,,Hess,11
Lorenzo,,Quadri,170
Lukas Andreas,,Reimann,172
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
Martin Anton,,Candinas,65
Martin Hans,,Bäumle,51
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
Michel Alexandre,,Matter,407
Mike,,Egger,341
Min Li,,Marti,293
Monika,,Rüegger,379
Mustafa,,Atici,368
Nadine Désirée,,Masshardt,144
Nadja,,Umbricht Pieren,167
Nicolas,,Walder,422
Nicolò Alessio,,Paganini,333
Niklaus-Samuel,Nik,Gugger,327
Olivier,,Feller,79
Olivier,,Français,86
Othmar Alois,,Reichmuth,423
Patricia Caroline Manuela,,von Falkenstein,430
Paul,,Rechsteiner,36
Peter Emil,,Schilliger,185
Peter,,Hegglin,317
Peter,,Keller,127
Petra,,Gössi,101
Philipp Matthias,,Bregy,340
Philipp,,Kutter,337
Philippe Edouard,,Bauer,266
Philippe,,Nantermod,297
Piero,,Marchesi,405
Pierre-Alain Roger,,Fridez,88
Pierre-André,,Page,299
Pierre-Yves,,Maillard,351
Pirmin Josef,,Bischof,219
Pirmin,,Schwander,190
Prisca,,Birrer-Heimo,55
Priska,,Seiler Graf,304
Priska,,Wismer-Felder,363
Raphaël,,Mahaim,433
Regine,,Sauter,302
Regula,,Rytz,183
Roberto,,Zanetti,246
Rocco,,Cattaneo,326
Roger,,Köppel,291
Roger,,Nordmann,159
Roland Rino,,Büchel,60
Roland,,Fischer,82
Ruedi,,Noser,160
Ruth Cornelia,,Humbel,12
Samira,,Marti,339
Samuel,,Bendahan,323
Sandra,,Locher Benguerel,397
Sandra,,Sollberger,305
Sarah Dominique,,Wyss,426
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
Thierry Paul,,Burkart,273
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
Yves Robert,,Nidegger,158
Yvette,,Estermann,75
Yvonne,,Feri,80
`);

// names from lobbyists.csv
const lobbyists = csv_to_regex_array(`
Adrian,,Bühler,581
Adrian,,Steiner,1139
Alain,,Gut,1026
Alain,,Zwygart,1157
Alecs,,Recher,1102
Alena,,Weibel,935
Alex,,Fischer,891
Alexander,,Meszmer,1193
Alexander,,Segert,732
Alexandra,,Erdin,1264
Alfred,,Aeppli,889
Alfred,Freddy,Moret,676
Alice,,Genoud,1244
Aliki,,Panayides,620
Aline Sara,,Rampazzo,822
Anders,,Gautschi,1131
André,,Kirchhofer,1049
André,,Marty,1321
André,,Vernay,605
Andreas Cyrill,,Hugi,340
Andreas Hans,,Missbach,1323
Andreas,,Binder,1137
Andreas,,Burgener,1118
Andreas,,Hammer,419
Andreas,,Lehner,1170
Andreas,,Lustenberger,1248
Andreas,,Wyss,739
Angelo,,Geninazzi,194
Anna-Lea,,Michael,1326
Anna,,de Quervain,1308
Anna,,Frey,1075
Anne,,Dousse,1032
Annette,,Walder,1186
Annina Rahel,,Grob,1206
Ariane,,Rustichelli,1168
Armin,,Menzi,297
Axel,,Müller,767
Babette,,Sigg Frank,1306
Belinda,,Walther Weger,398
Benjamin Tim,,Klaus,1263
Benoît,,Cerutti,1201
Benoît,,Gaillard,1148
Bernhard,,Höneisen,1123
Bernhard,,Meier,706
Berno,,Stoffel,1254
Bettina,,Mutter,1286
Brigitta,,Dolder-Troller,638
Bruno,,Dobler,1084
Bruno,,Henggi,1082
Bruno,,Perroud,552
Bruno,,Schläpfer,939
Camilla,,Lafranchi,1325
Carina,,Schaller,894
Carlo,,Steiner,1135
Carmen,,Imark-Schmidhalter,764
Carmen,,Inauen,1213
Caroline,,Abu Sa'Da,1074
Carsten,,Schmidt,1143
Casimir,,Platzer,578
Caspar,,Bijleveld,1257
Catherine,,Rouvenaz Badoud,753
Cathrine,,Ambrus,1208
Céline Beatrice,,Tschirky,1290
Céline,,Sutter,1070
Che,,Wagner,1241
Chico Angelo,,Koch,1228
Christian Peter,,Neuhaus,1096
Christian,,Zünd,750
Christina,,Bachmann-Roth,1322
Christof,,Dietler,1200
Christoph Martin,,Kamber,1265
Christoph,,Merkli,1024
Christoph,,Trummer,1136
Christophe,,Hans,526
Clarence,,Chollet,1338
Claudio,,Kuster,169
Claudio,,Schmid,1344
Cornelia Elisabeth,,Stamm Hurter,143
Cristina Maria,,Zanini Barzaghi,1253
Cynthia,,Lang,1288
Dagmar,,Rösler,1199
Daniel Josef,,Lampart,600
Daniel Noël,,Bulliard,84
Daniel,,Borner,846
Daniel,,Piazza,1214
Daniel,,Wiener,1256
David Michael,,Schenker,1245
David,,Cornut,1156
David,,Herzig,1095
David,,Ruetschi,1152
David,,Stickelberger,1197
David,,Trachsel,1285
Diego,,Baratti,1239
Dina,,Spörri,1231
Dominik Christian,,Waser,1182
Dominik,,Gross,599
Dominik,,Rohrer,688
Dominique,,Martin,1099
Dorothea,,Aebi-Keller,1251
Elena Antonella,,Strozzi,1064
Elias Manuel,,Maier,771
Elias Raphael,,Meier,1077
Elias,,Bricker,1069
Emilie,,Graff,1081
Erich Peter,,Tschirky,1107
Erich,,Heynen,1215
Ernest,,Geiser,1169
Etienne,,Bütikofer,63
Etrit,,Hasler,1129
Eva,,Schmassmann,1134
Eveline,,Rechsteiner,1058
Fabian Mathias,,Frauenfelder,888
Fabienne,,Thomas,1133
Fabio,,Gassmann,1057
Felix Michael,,Wirz,1163
Felix,,Ruppen,1185
Felix,,Schneuwly,1184
Fernanda Esquerdo,,Falchi,1315
Flavia,,Canali,1183
Florence,,Schurch,963
Floriane,,Kaiser,1234
Francis,,Egger,79
Franco Eugenio,,Denti,1175
François,,Turrian,1294
François,,Yerly,1330
Frank,,Furrer,645
Franz,,Egle,646
Franziska,,Lenz,1097
Gabriel,,Fischer,1280
Gabriel,,Rumo,1233
Gabriela Naemi,,Medici,1122
Gallus,,Cadonau,794
Georg Carl,,Umbricht,1056
Georges,,Zünd,648
Gérald,,Nicod,1091
Gian,,Brun,1261
Giorgio,,Tuti,384
Guido,,Graf,286
Hannes,,Hui,1220
Hans Jörg,,Rüegsegger,730
Hans-Peter,,Wüthrich,592
Hanspeter,,Hohl,1033
Harry,,Graf,290
Hasan,,Candan,1342
Heinrich,,Minder,1101
Helen,,Fässler-Eiermann,437
Hélène,,Noirjean,1242
Henrique,,Schneider,1132
Hilmar,,Gernet,687
Hugo,,Clémence,1332
Jacopo,,Canova,1307
Jan,,Bumann,1153
Jan,,Gnägi,1272
Jan,,Mühlethaler,1210
Janina,,Aeberhard,1275
Jean-Félix,,Savary,672
Jérôme,,Hayoz,1295
Jessica,,Phrakousonh,1346
Johanna,,Bundi Ryser,801
Johannes,,Schwarz,220
Jonas,,Glanzmann,119
Josef,,Bollag,180
Judith Lisa,,Hanhart,1035
Jules,,Aubert,1030
Julia,,Fischer,1319
Julien Boris,,Neruda,1177
Jürg,,Aschwanden,1098
Jürg,,Maurer,176
Jürg,,Staudenmann,662
Károly Christian,Karoly,Köpe,1222
Kathy,,Steiner,1039
Kevin,,Grangier,561
Konrad Thomas,,Studerus,1154
Kristina,,Lanz,977
Kurt Heinrich,,Zollinger,1198
Kurt,,Gfeller,661
Laetitia,,Bettex,1158
Laura,,Brechbühler,1341
Laura,,Kopp,809
Lelia,,Hunziker,1067
Linda,,Strupler,1260
Lisa Ruth,,Vincenz,1073
Livia Salome,,Aeschbach-Jauslin,677
Lorenz,,Furrer,183
Louis,,Perron,1108
Luc,,Leumann,339
Luc,,Thomas,1151
Luca,,Boog,1309
Lucius,,Dürr,903
Lukas,,Aecherli,1255
Lukas,,Wegmüller,1124
Luzia,,Grüter-Bucher,1042
Luzian,,Franzini,1138
Magali,,Corpataux,1162
Manuel,,Graf,221
Marc,,Rüdisüli,1345
Marc,,Vetterli,1271
Marcel,,Durst,1110
Marcel,,Kreber,121
Marcel,,Liner,876
Marcel,,Sennhauser,940
Marcia,,Cerantola,1141
Marco,,Grüter,1227
Marco,,Taddei,1109
Margret,,Wasserfallen,235
Maria Luisa,,Bernini Burkhard,1189
Markus,,Meier,1343
Martin Marcel,,Kuonen,682
Martin,,Bossard,1105
Martin,,Dätwyler,1065
Martin,,Kaiser,1277
Martin,,Leschhorn Strebel,1266
Martin,,Rufer,613
Martina Teresa,,Würth,887
Martina,,Novak,1144
Martina,,Vieli,1171
Martine,,Cottier-Chassot,1310
Massimo,,Suter,1296
Matthias Kaspar,,Hui,1196
Matthias P.A.,,Müller,1292
Matthias,,Dietrich,769
Matthias,,Humbel,1094
Max,,Hofmann,1068
Michael Johann,,Frank,1145
Michael,,Bützer,1223
Michael,,Felber,1235
Michael,,Fust,1053
Michael,,Geissbühler,713
Michael,,Ineichen,1236
Michael,,Köpfli,1317
Michael,,Schmid,276
Michael,,Wieser,1340
Michel Alain,,Rudin,1037
Michel Joseph Paul,,Darbellay,1316
Michel Sandro,,Grunder,1269
Michèle,,Andermatt,1165
Micole,,Gotti,1247
Mike,,Bacher,778
Milco,,Margaroli,1176
Miriam,,Gurtner (Dagai),1045
Monika,,Lienert,571
Monika,,Litscher,1339
Muriel,,Waeger,1142
Nadine,,Aebischer,1221
Natalie,,Imboden,890
Nello,,Castelli,1078
Nicola Manuel,,Forster,1041
Nicola,,Goepfert,1164
Nicolas,,Reymond,1055
Nicole Caroline,,Beutler,665
Nicole,,Cornu,1284
Niklaus,,Wepfer,1283
Nils,,Epprecht,1289
Noémi,,Weber,1149
Océane Camille Céline,,Dayer,895
Oleg,,Gafner,1115
Olivier,,Fantino,1119
Olivier,,Mark,1031
Pascal,,Olivier,1181
Patrick Olivier,,Eperon,1085
Patrick,,Hofstetter,1089
Patrick,,Mayer,1120
Patrizia,,Lehmann,1063
Paul Hugo,,Mori,942
Paul Robert,,Waldmann,1207
Pauline,,Crettol,1336
Pentti,,Aellig,1311
Peter Alois,,Metzinger,1194
Peter Eugen Seraphin,,Saxenhofer,368
Peter,,Hug,1287
Peter,,Meier,1240
Philip Holmgaard,,Kristensen,1333
Philipp Christof,,Mäder,1259
Philipp,,Niederberger,1282
Philipp,,Ryf,1318
Philippe David Martin,,Kühni,1249
Philippe Jean-Jacques,,Miauton,558
Philippe,,Zahno,981
Pierre,,Zwahlen,387
Rahel Andrea,,Ruch,1320
Raimund,,Rodewald,207
Raphaël,,Bez,1125
Rebecca Emmanuelle,,Joly,1218
Regula,,Bühlmann,1205
Remco André,,Giovanoli,932
Renate,,Hotz Schläpfer,116
René,,Gerber,1314
René,,Jenny,765
René,,Rall,702
Reto Marc,,Jaussi,1172
Reto,,Vincenz,1072
Reto,,Wiesli,1087
Reto,,Wyss,842
Robin,,Eymann,1203
Robin,,Quartier,1090
Roger,,Hegi,608
Roger,,Kunz,946
Roland A.,,Müller,1066
Roman Jürg,,Fischer,961
Roman,,Heggli,1025
Roman,,Weissen,1187
Romano,,Amacker,1281
Ronny,,Kaufmann,1252
Rosmarie,,Salzmann,1022
Rudolf,,Guggisberg,1044
Rudolf,Ruedi,Horber,1301
Sacra,,Tomisawa,1034
Samuel,,Rohrbach,1270
Sara,,Stalder,77
Sarah-Lee,,Keller,1161
Sarkis,,Shahinian,1180
Sébastien,,Leprat,1303
Silas,,Hobi,1114
Silvan,,Lipp,854
Simon Paul Auguste,,Zurich,917
Simon,,Banholzer,1147
Simon,,Binder,1195
Simon,,Gisler,1291
Simone,,Eggler,828
Sonja,,Steinmann,1088
Sophie,,Achermann,899
Sophie,,Haenni,1050
Soren Bo,,Henrichsen,1229
Stefan Andreas,,Jakob,1238
Stefan,,Batzli,341
Stefan,,Brupbacher,1116
Stefan,,Flückiger,950
Stefan,,Kunz,1140
Stefan,,Vannoni,1250
Stefano,,Kunz,843
Sue,,Putallaz,1150
Tatiana,,Rezso,1276
Térence,,Durig,1334
Thomas Christian,Tom,Berger,696
Thomas,,Borer,1048
Thomas,,Kähr,415
Timotheus,,Bruderer,1166
Tobias Simon,,Vögeli,1279
Tobias,,König,1216
Ulrich Emanuel,Ueli,Stückelberger,1190
Ulrich Rudolf,,Frei,583
Ulrich,,Keller,245
Urban,,Hodel,1111
Urs Andreas,,Hofstetter,1246
Urs,,Helfenstein,557
Urs,,Schneider,908
Urs,,Vögeli,1027
Urs,,Wellauer,1331
Valentin,,Vogt,639
Valeria Maddalena,,Matasci,1335
Valérie Karlen,,Bourdin,1337
Valérie,,Borioli Sandoz,1128
Vanessa,,Jenni-Lincoln,627
Vania,,Alleva,1106
Varuna,,Singh Auroi,322
Verio Dante,,Pini,1174
Walter,,Stüdeli,123
Werner,,Gartenmann,1293
Xavier,,Bertelletto,1179
Xavier,,Pilloud,1313
Yael,,Bloch,937
Yves Samuel,,Weidmann,943
Yvonne,,Ribi,296
`);

function highlightInternal(e, matches) {
    for (var k = 2; k-- > 0;) {
        var re = new RegExp([parlamentarians, lobbyists][k], 'gid');
        const lwClass = k === 0 ? 'lw-parliamentarian' : 'lw-lobbyist';
        let match;
        let localMatches = [];
        while (match = re.exec(e.textContent)) {
            localMatches.push(match);
        }
        for (var j = localMatches.length; j-- > 0;) {
            match = localMatches[j];
            if (e.nodeType == 3) {
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
            } else {
                e.classList.add(lwClass);
                e.classList.add('lw-person');
                const id = Object.entries(match.groups).find(([k, v]) => v)[0].substring(1);
                e.setAttribute('data-lw', matches.length + ';' + id);
                matches.push(e);
            }
        }
    }
}

// function to recursively tag all matching names using a span
function highlight(element, matches) {
    let nodes = element.childNodes;
    for (var i = nodes.length; i-- > 0;) {
        const e = nodes[i];
        if (e.nodeType === 3) {
            highlightInternal(e, matches);
        } else if (e.nodeType === 1 && e.hasAttribute('data-lw')) {
            // empty to stop repeated nested tagging when running the highlighting multiple times
            let dataLw = e.getAttribute('data-lw');
            // set data-lw attribute again in case DOM was changed
            if (!dataLw.startsWith(matches.length + ';')) {
                e.setAttribute('data-lw', matches.length + dataLw.substring(dataLw.indexOf(';')));
            }
            matches.push(e);
        } else if (e.nodeType === 1 && ['script', 'style'].includes(e.tagName.toLowerCase())) {
            // don't descend into JavaScript and CSS
        } else if (e.nodeType === 1 && ['tr'].includes(e.tagName.toLowerCase())) {
            // attempt to match table data
            let matchCountBefore = matches.length;
            highlight(e, matches);
            if (matches.length === matchCountBefore) {
                highlightInternal(e, matches);
            }
        } else {
            // TODO fix pages with last name in <strong> (<em> or <b>) like https://www.hagel.ch/de/ueber-uns/verwaltungsrat/
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
        unselectElement(document.querySelector(".lw-selected"));
        selectElement(document.querySelector(".lw-person[data-lw='" + msg.seqNr + "']"));
    } else if (msg.action === 'select-next') {
        moveSelection(1);
    } else if (msg.action === 'select-previous') {
        moveSelection(-1);
    }
});
