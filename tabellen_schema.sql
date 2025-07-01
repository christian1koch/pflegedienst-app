CREATE TABLE PFLEGEKRAFT (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE PATIENT (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50),
    alter INTEGER,
    gewicht DECIMAL,
    addresse VARCHAR(100),
    geschlecht CHAR(1) check(geschlecht in ('m', 'f', 'd')),
    pflegekraft_id INTEGER references PFLEGEKRAFT(id)
);

CREATE TABLE MEDIKAMENT (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE BEHANDLUNG (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50),
    ort VARCHAR(50),
    empfohlene_sitzungen INTEGER,
    pflegekraft_id INTEGER references PFLEGEKRAFT(id)
);

CREATE TABLE WAGEN (
    kennzeichen VARCHAR(8) PRIMARY KEY,
    model VARCHAR(50),
    sitzplaetze INTEGER
);

CREATE TABLE PATIENTEN_MEDIKAMENTE(
    patienten_id INTEGER references PATIENT(id),
    medikament_id INTEGER references MEDIKAMENT(id),
    dosis TEXT,
    einnahmezeit DATE,
    PRIMARY KEY (patienten_id, medikament_id, einnahmezeit)
);

CREATE TABLE PATIENTEN_BEHANDLUNG(
    behandlung_id INTEGER references BEHANDLUNG(id),
    patienten_id INTEGER references PATIENT(id),
    sitzung_nr INTEGER,
    datum DATE,
    PRIMARY KEY (behandlung_id, patienten_id, sitzung_nr)
);

CREATE TABLE WAGEN_BUCHUNGEN(
    wagen_kz VARCHAR(8) references WAGEN(kennzeichen),
    pflegekraft_id INTEGER references PFLEGEKRAFT(id),
    ausleih_datum DATE,
    ausgabe_datum DATE,
    PRIMARY KEY (wagen_kz, pflegekraft_id, ausleih_datum)
);

CREATE TABLE PFLEGEKRAFT_VERFUERBARKEITEN(
    pflegekraft_id INTEGER references PFLEGEKRAFT(id),
    wochentag TEXT CHECK (wochentag IN ('Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag')),
    startzeit TIME,
    endzeit TIME,
    PRIMARY KEY (pflegekraft_id, wochentag, startzeit)
);