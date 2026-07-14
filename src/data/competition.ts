// AUTO-GENERIERT aus '2026 - Trainings - Bewerbszeiten.pdf'
// Trainings- & Wettkampfplan CTIF 2026 Šumperk

export interface CompTeam { nr: number; display: string; country: string; isFemale: boolean; }
export interface RunEntry { lane: string; teamNr?: number; display?: string; pause?: boolean; }
export interface Run { dg: number; from?: string; to?: string; time?: string; entries: RunEntry[]; }
export interface Discipline { discipline: string; lanes: string[]; timeMode: string; runs: Run[]; }
export interface CompDay { date: string; label: string; type: string; disciplines: Discipline[]; }

export const COMP_TEAMS: CompTeam[] = [
  {
    "nr": 1,
    "display": "Kauklahden FIN",
    "country": "FIN",
    "isFemale": false
  },
  {
    "nr": 2,
    "display": "SATU MARE RU",
    "country": "RU",
    "isFemale": false
  },
  {
    "nr": 3,
    "display": "MDP PRZYTKOWICE Fem. POL",
    "country": "POL",
    "isFemale": true
  },
  {
    "nr": 4,
    "display": "Pisková Lhota Fem. CZ",
    "country": "CZ",
    "isFemale": true
  },
  {
    "nr": 5,
    "display": "ZGORNJI TUHINJ SLO",
    "country": "SLO",
    "isFemale": false
  },
  {
    "nr": 6,
    "display": "Japan 2 JPN Fem.",
    "country": "JPN",
    "isFemale": true
  },
  {
    "nr": 7,
    "display": "Guggenberg AUT",
    "country": "AUT",
    "isFemale": false
  },
  {
    "nr": 8,
    "display": "Manchester UK",
    "country": "UK",
    "isFemale": false
  },
  {
    "nr": 9,
    "display": "Luxemburg 1 LUX",
    "country": "LUX",
    "isFemale": false
  },
  {
    "nr": 10,
    "display": "Teteven BGR",
    "country": "BGR",
    "isFemale": false
  },
  {
    "nr": 11,
    "display": "Maskun FIN",
    "country": "FIN",
    "isFemale": false
  },
  {
    "nr": 12,
    "display": "Oise FR",
    "country": "FR",
    "isFemale": false
  },
  {
    "nr": 13,
    "display": "Trentino ITA",
    "country": "ITA",
    "isFemale": false
  },
  {
    "nr": 14,
    "display": "Bludov CZ",
    "country": "CZ",
    "isFemale": false
  },
  {
    "nr": 15,
    "display": "MDP MIEJSCE ODRZAŃSKIE POL",
    "country": "POL",
    "isFemale": false
  },
  {
    "nr": 16,
    "display": "BREZOI, VÂLCEA COUNTY RU",
    "country": "RU",
    "isFemale": false
  },
  {
    "nr": 17,
    "display": "DRENOV GRIČ - LES. B. SLO",
    "country": "SLO",
    "isFemale": false
  },
  {
    "nr": 18,
    "display": "Japan 1 JPN",
    "country": "JPN",
    "isFemale": false
  },
  {
    "nr": 19,
    "display": "Winden Windegg AUT",
    "country": "AUT",
    "isFemale": false
  },
  {
    "nr": 20,
    "display": "Liechtenstein LIE",
    "country": "LIE",
    "isFemale": false
  },
  {
    "nr": 21,
    "display": "DVD NOVI MAROF HR",
    "country": "HR",
    "isFemale": false
  },
  {
    "nr": 22,
    "display": "Kyustendil BGR",
    "country": "BGR",
    "isFemale": false
  },
  {
    "nr": 23,
    "display": "Luxemburg 2 LUX",
    "country": "LUX",
    "isFemale": false
  },
  {
    "nr": 24,
    "display": "Yvelines M FR",
    "country": "FR",
    "isFemale": false
  },
  {
    "nr": 25,
    "display": "Trentino 1 Fem.",
    "country": "",
    "isFemale": true
  },
  {
    "nr": 26,
    "display": "Bludov - FEMALE Fem. CZ",
    "country": "CZ",
    "isFemale": true
  },
  {
    "nr": 27,
    "display": "MDP DOBRA POL",
    "country": "POL",
    "isFemale": false
  },
  {
    "nr": 28,
    "display": "NEAMȚ COUNTY RU",
    "country": "RU",
    "isFemale": false
  },
  {
    "nr": 29,
    "display": "DRENOV GRIČ - LE. BR. SLO Fem.",
    "country": "SLO",
    "isFemale": true
  },
  {
    "nr": 30,
    "display": "International 1",
    "country": "",
    "isFemale": false
  },
  {
    "nr": 31,
    "display": "St. Martin i. M. AUT",
    "country": "AUT",
    "isFemale": false
  },
  {
    "nr": 32,
    "display": "Ukraine 1 UKR",
    "country": "UKR",
    "isFemale": false
  },
  {
    "nr": 33,
    "display": "DVD KOPRIVNICA HR Fem.",
    "country": "HR",
    "isFemale": true
  },
  {
    "nr": 34,
    "display": "Lom BGR",
    "country": "BGR",
    "isFemale": false
  },
  {
    "nr": 35,
    "display": "Herala-Iitti FIN Fem.",
    "country": "FIN",
    "isFemale": true
  },
  {
    "nr": 36,
    "display": "JSP Sain Marice de Beynost FR",
    "country": "FR",
    "isFemale": false
  },
  {
    "nr": 37,
    "display": "REBORDOSA PT",
    "country": "PT",
    "isFemale": false
  },
  {
    "nr": 38,
    "display": "Pisková Lhota CZ",
    "country": "CZ",
    "isFemale": false
  },
  {
    "nr": 39,
    "display": "Oberneukirchen 2 GER Fem.",
    "country": "GER",
    "isFemale": true
  },
  {
    "nr": 40,
    "display": "Antholt Mittertal Südt. ITA",
    "country": "ITA",
    "isFemale": false
  },
  {
    "nr": 41,
    "display": "Mitteregg-Haagen-Sand AUT",
    "country": "AUT",
    "isFemale": false
  },
  {
    "nr": 42,
    "display": "VÉRTESSOMLÓI ÓTE L. HU Fem.",
    "country": "HU",
    "isFemale": true
  },
  {
    "nr": 43,
    "display": "DVD Ostrana HR",
    "country": "HR",
    "isFemale": false
  },
  {
    "nr": 44,
    "display": "Chlumec na Cidlinou CZ",
    "country": "CZ",
    "isFemale": false
  },
  {
    "nr": 45,
    "display": "Dassendorf GER",
    "country": "GER",
    "isFemale": false
  },
  {
    "nr": 46,
    "display": "DHZ Veľký Lapáš SK Fem.",
    "country": "SK",
    "isFemale": true
  },
  {
    "nr": 47,
    "display": "Glogonj Fem. SRB",
    "country": "SRB",
    "isFemale": true
  },
  {
    "nr": 48,
    "display": "KURD ÖTE LEÁNY HU Fem.",
    "country": "HU",
    "isFemale": true
  },
  {
    "nr": 49,
    "display": "International 2",
    "country": "",
    "isFemale": false
  },
  {
    "nr": 50,
    "display": "International 3",
    "country": "",
    "isFemale": false
  },
  {
    "nr": 51,
    "display": "Brandsprinter Pizol CH",
    "country": "CH",
    "isFemale": false
  },
  {
    "nr": 52,
    "display": "DHZ Veľká Hradná SK",
    "country": "SK",
    "isFemale": false
  },
  {
    "nr": 53,
    "display": "REBORDOSA Fem. PT",
    "country": "PT",
    "isFemale": true
  },
  {
    "nr": 54,
    "display": "Schweden 1 SWE",
    "country": "SWE",
    "isFemale": false
  },
  {
    "nr": 55,
    "display": "Kovin SRB",
    "country": "SRB",
    "isFemale": false
  },
  {
    "nr": 56,
    "display": "VÉRTESSOMLÓI ÓTE FIÚ HU",
    "country": "HU",
    "isFemale": false
  },
  {
    "nr": 57,
    "display": "Oberneukirchen 1 GER",
    "country": "GER",
    "isFemale": false
  },
  {
    "nr": 58,
    "display": "DHZ Šuňava SK",
    "country": "SK",
    "isFemale": false
  }
];

export const COMP_DAYS: CompDay[] = [
  {
    "date": "2026-07-14",
    "label": "TRAINING 1",
    "type": "Training",
    "disciplines": [
      {
        "discipline": "Staffellauf",
        "lanes": [
          "Bahn 1",
          "Bahn 2"
        ],
        "timeMode": "from_to",
        "runs": [
          {
            "dg": 1,
            "from": "08:00",
            "to": "08:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 1,
                "display": "Kauklahden FIN"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 2,
                "display": "SATU MARE RU"
              }
            ]
          },
          {
            "dg": 2,
            "from": "08:10",
            "to": "08:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 3,
                "display": "MDP PRZYTKOWICE Fem. POL"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 4,
                "display": "Pisková Lhota Fem. CZ"
              }
            ]
          },
          {
            "dg": 3,
            "from": "08:20",
            "to": "08:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 5,
                "display": "ZGORNJI TUHINJ SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 6,
                "display": "Japan 2 JPN Fem."
              }
            ]
          },
          {
            "dg": 4,
            "from": "08:30",
            "to": "08:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 7,
                "display": "Guggenberg AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 8,
                "display": "Manchester UK"
              }
            ]
          },
          {
            "dg": 5,
            "from": "08:40",
            "to": "08:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 9,
                "display": "Luxemburg 1 LUX"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 10,
                "display": "Teteven BGR"
              }
            ]
          },
          {
            "dg": 6,
            "from": "08:50",
            "to": "09:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 11,
                "display": "Maskun FIN"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 12,
                "display": "Oise FR"
              }
            ]
          },
          {
            "dg": 7,
            "from": "09:00",
            "to": "09:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 13,
                "display": "Trentino ITA"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 14,
                "display": "Bludov CZ"
              }
            ]
          },
          {
            "dg": 8,
            "from": "09:10",
            "to": "09:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 15,
                "display": "MDP MIEJSCE ODRZAŃSKIE POL"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 16,
                "display": "BREZOI, VÂLCEA COUNTY RU"
              }
            ]
          },
          {
            "dg": 9,
            "from": "09:20",
            "to": "09:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 17,
                "display": "DRENOV GRIČ - LES. B. SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 18,
                "display": "Japan 1 JPN"
              }
            ]
          },
          {
            "dg": 10,
            "from": "09:30",
            "to": "09:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 19,
                "display": "Winden Windegg AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 20,
                "display": "Liechtenstein LIE"
              }
            ]
          },
          {
            "dg": 11,
            "from": "09:40",
            "to": "09:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 21,
                "display": "DVD NOVI MAROF HR"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 22,
                "display": "Kyustendil BGR"
              }
            ]
          },
          {
            "dg": 12,
            "from": "09:50",
            "to": "10:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 23,
                "display": "Luxemburg 2 LUX"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 24,
                "display": "Yvelines M FR"
              }
            ]
          },
          {
            "dg": 13,
            "from": "10:00",
            "to": "10:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 25,
                "display": "Trentino 1 Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 26,
                "display": "Bludov - FEMALE Fem. CZ"
              }
            ]
          },
          {
            "dg": 14,
            "from": "10:10",
            "to": "10:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 27,
                "display": "MDP DOBRA POL"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 28,
                "display": "NEAMȚ COUNTY RU"
              }
            ]
          },
          {
            "dg": 15,
            "from": "10:20",
            "to": "10:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 29,
                "display": "DRENOV GRIČ - LE. BR. SLO Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 30,
                "display": "International 1"
              }
            ]
          },
          {
            "dg": 16,
            "from": "10:30",
            "to": "10:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 31,
                "display": "St. Martin i. M. AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 32,
                "display": "Ukraine 1 UKR"
              }
            ]
          },
          {
            "dg": 17,
            "from": "10:40",
            "to": "10:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 33,
                "display": "DVD KOPRIVNICA HR Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 34,
                "display": "Lom BGR"
              }
            ]
          },
          {
            "dg": 18,
            "from": "10:50",
            "to": "11:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 35,
                "display": "Herala-Iitti FIN Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 36,
                "display": "JSP Sain Marice de Beynost FR"
              }
            ]
          },
          {
            "dg": 19,
            "from": "11:00",
            "to": "11:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 37,
                "display": "REBORDOSA PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 38,
                "display": "Pisková Lhota CZ"
              }
            ]
          },
          {
            "dg": 20,
            "from": "11:10",
            "to": "11:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 39,
                "display": "Oberneukirchen 2 GER Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 40,
                "display": "Antholt Mittertal Südt. ITA"
              }
            ]
          },
          {
            "dg": 21,
            "from": "11:20",
            "to": "11:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 41,
                "display": "Mitteregg-Haagen-Sand AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 42,
                "display": "VÉRTESSOMLÓI ÓTE L. HU Fem."
              }
            ]
          },
          {
            "dg": 22,
            "from": "11:30",
            "to": "11:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 43,
                "display": "DVD Ostrana HR"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 44,
                "display": "Chlumec na Cidlinou CZ"
              }
            ]
          },
          {
            "dg": 23,
            "from": "11:40",
            "to": "11:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 24,
            "from": "11:50",
            "to": "12:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 25,
            "from": "12:00",
            "to": "12:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 26,
            "from": "12:10",
            "to": "12:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 45,
                "display": "Dassendorf GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 46,
                "display": "DHZ Veľký Lapáš SK Fem."
              }
            ]
          },
          {
            "dg": 27,
            "from": "12:20",
            "to": "12:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 47,
                "display": "Glogonj Fem. SRB"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 48,
                "display": "KURD ÖTE LEÁNY HU Fem."
              }
            ]
          },
          {
            "dg": 28,
            "from": "12:30",
            "to": "12:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 49,
                "display": "International 2"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 50,
                "display": "International 3"
              }
            ]
          },
          {
            "dg": 29,
            "from": "12:40",
            "to": "12:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 51,
                "display": "Brandsprinter Pizol CH"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 52,
                "display": "DHZ Veľká Hradná SK"
              }
            ]
          },
          {
            "dg": 30,
            "from": "12:50",
            "to": "13:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 53,
                "display": "REBORDOSA Fem. PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 54,
                "display": "Schweden 1 SWE"
              }
            ]
          },
          {
            "dg": 31,
            "from": "13:00",
            "to": "13:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 55,
                "display": "Kovin SRB"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 56,
                "display": "VÉRTESSOMLÓI ÓTE FIÚ HU"
              }
            ]
          },
          {
            "dg": 32,
            "from": "13:10",
            "to": "13:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 57,
                "display": "Oberneukirchen 1 GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 58,
                "display": "DHZ Šuňava SK"
              }
            ]
          }
        ]
      },
      {
        "discipline": "Hindernisbahn",
        "lanes": [
          "Bahn 1",
          "Bahn 2",
          "Bahn 3",
          "Bahn 4"
        ],
        "timeMode": "from_to",
        "runs": [
          {
            "dg": 1,
            "from": "08:30",
            "to": "08:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 1,
                "display": "Kauklahden FIN"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 2,
                "display": "SATU MARE RU"
              }
            ]
          },
          {
            "dg": 2,
            "from": "08:40",
            "to": "09:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 3,
                "display": "MDP PRZYTKOWICE Fem. POL"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 4,
                "display": "Pisková Lhota Fem. CZ"
              }
            ]
          },
          {
            "dg": 3,
            "from": "08:50",
            "to": "09:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 5,
                "display": "ZGORNJI TUHINJ SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 6,
                "display": "Japan 2 JPN Fem."
              }
            ]
          },
          {
            "dg": 4,
            "from": "09:00",
            "to": "09:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 7,
                "display": "Guggenberg AUT"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 8,
                "display": "Manchester UK"
              }
            ]
          },
          {
            "dg": 5,
            "from": "09:10",
            "to": "09:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 9,
                "display": "Luxemburg 1 LUX"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 10,
                "display": "Teteven BGR"
              }
            ]
          },
          {
            "dg": 6,
            "from": "09:20",
            "to": "09:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 11,
                "display": "Maskun FIN"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 12,
                "display": "Oise FR"
              }
            ]
          },
          {
            "dg": 7,
            "from": "09:30",
            "to": "09:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 13,
                "display": "Trentino ITA"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 14,
                "display": "Bludov CZ"
              }
            ]
          },
          {
            "dg": 8,
            "from": "09:40",
            "to": "10:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 15,
                "display": "MDP MIEJSCE ODRZAŃSKIE POL"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 16,
                "display": "BREZOI, VÂLCEA COUNTY RU"
              }
            ]
          },
          {
            "dg": 9,
            "from": "09:50",
            "to": "10:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 17,
                "display": "DRENOV GRIČ - LES. B. SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 18,
                "display": "Japan 1 JPN"
              }
            ]
          },
          {
            "dg": 10,
            "from": "10:00",
            "to": "10:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 19,
                "display": "Winden Windegg AUT"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 20,
                "display": "Liechtenstein LIE"
              }
            ]
          },
          {
            "dg": 11,
            "from": "10:10",
            "to": "10:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 21,
                "display": "DVD NOVI MAROF HR"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 22,
                "display": "Kyustendil BGR"
              }
            ]
          },
          {
            "dg": 12,
            "from": "10:20",
            "to": "10:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 23,
                "display": "Luxemburg 2 LUX"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 24,
                "display": "Yvelines M FR"
              }
            ]
          },
          {
            "dg": 13,
            "from": "10:30",
            "to": "10:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 25,
                "display": "Trentino 1 Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 26,
                "display": "Bludov - FEMALE Fem. CZ"
              }
            ]
          },
          {
            "dg": 14,
            "from": "10:40",
            "to": "11:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 27,
                "display": "MDP DOBRA POL"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 28,
                "display": "NEAMȚ COUNTY RU"
              }
            ]
          },
          {
            "dg": 15,
            "from": "10:50",
            "to": "11:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 29,
                "display": "DRENOV GRIČ - LE. BR. SLO Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 30,
                "display": "International 1"
              }
            ]
          },
          {
            "dg": 16,
            "from": "11:00",
            "to": "11:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 31,
                "display": "St. Martin i. M. AUT"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 32,
                "display": "Ukraine 1 UKR"
              }
            ]
          },
          {
            "dg": 17,
            "from": "11:10",
            "to": "11:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 33,
                "display": "DVD KOPRIVNICA HR Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 34,
                "display": "Lom BGR"
              }
            ]
          },
          {
            "dg": 18,
            "from": "11:20",
            "to": "11:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 35,
                "display": "Herala-Iitti FIN Fem."
              },
              {
                "lane": "Bahn 4",
                "teamNr": 36,
                "display": "JSP Sain Marice de Beynost FR"
              }
            ]
          },
          {
            "dg": 19,
            "from": "11:30",
            "to": "11:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 37,
                "display": "REBORDOSA PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 38,
                "display": "Pisková Lhota CZ"
              }
            ]
          },
          {
            "dg": 20,
            "from": "11:40",
            "to": "12:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 39,
                "display": "Oberneukirchen 2 GER Fem."
              },
              {
                "lane": "Bahn 4",
                "teamNr": 40,
                "display": "Antholt Mittertal Südt. ITA"
              }
            ]
          },
          {
            "dg": 21,
            "from": "11:50",
            "to": "12:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 41,
                "display": "Mitteregg-Haagen-Sand AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 42,
                "display": "VÉRTESSOMLÓI ÓTE L. HU Fem."
              }
            ]
          },
          {
            "dg": 22,
            "from": "12:00",
            "to": "12:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 43,
                "display": "DVD Ostrana HR"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 44,
                "display": "Chlumec na Cidlinou CZ"
              }
            ]
          },
          {
            "dg": 23,
            "from": "12:10",
            "to": "12:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 24,
            "from": "12:20",
            "to": "12:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "pause": true
              },
              {
                "lane": "Bahn 4",
                "pause": true
              }
            ]
          },
          {
            "dg": 25,
            "from": "12:30",
            "to": "12:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 26,
            "from": "12:40",
            "to": "13:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "pause": true
              },
              {
                "lane": "Bahn 4",
                "pause": true
              }
            ]
          },
          {
            "dg": 27,
            "from": "12:50",
            "to": "13:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 45,
                "display": "Dassendorf GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 46,
                "display": "DHZ Veľký Lapáš SK Fem."
              }
            ]
          },
          {
            "dg": 28,
            "from": "13:00",
            "to": "13:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 47,
                "display": "Glogonj Fem. SRB"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 48,
                "display": "KURD ÖTE LEÁNY HU Fem."
              }
            ]
          },
          {
            "dg": 29,
            "from": "13:10",
            "to": "13:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 49,
                "display": "International 2"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 50,
                "display": "International 3"
              }
            ]
          },
          {
            "dg": 30,
            "from": "13:20",
            "to": "13:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 51,
                "display": "Brandsprinter Pizol CH"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 52,
                "display": "DHZ Veľká Hradná SK"
              }
            ]
          },
          {
            "dg": 31,
            "from": "13:30",
            "to": "13:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 53,
                "display": "REBORDOSA Fem. PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 54,
                "display": "Schweden 1 SWE"
              }
            ]
          },
          {
            "dg": 32,
            "from": "13:40",
            "to": "14:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 55,
                "display": "Kovin SRB"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 56,
                "display": "VÉRTESSOMLÓI ÓTE FIÚ HU"
              }
            ]
          },
          {
            "dg": 33,
            "from": "13:50",
            "to": "14:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 57,
                "display": "Oberneukirchen 1 GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 58,
                "display": "DHZ Šuňava SK"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "date": "2026-07-15",
    "label": "TRAINING 2",
    "type": "Training",
    "disciplines": [
      {
        "discipline": "Staffellauf",
        "lanes": [
          "Bahn 1",
          "Bahn 2"
        ],
        "timeMode": "from_to",
        "runs": [
          {
            "dg": 1,
            "from": "08:00",
            "to": "08:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 1,
                "display": "Kauklahden FIN"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 2,
                "display": "SATU MARE RU"
              }
            ]
          },
          {
            "dg": 2,
            "from": "08:10",
            "to": "08:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 3,
                "display": "MDP PRZYTKOWICE Fem. POL"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 4,
                "display": "Pisková Lhota Fem. CZ"
              }
            ]
          },
          {
            "dg": 3,
            "from": "08:20",
            "to": "08:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 5,
                "display": "ZGORNJI TUHINJ SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 6,
                "display": "Japan 2 JPN Fem."
              }
            ]
          },
          {
            "dg": 4,
            "from": "08:30",
            "to": "08:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 7,
                "display": "Guggenberg AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 8,
                "display": "Manchester UK"
              }
            ]
          },
          {
            "dg": 5,
            "from": "08:40",
            "to": "08:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 9,
                "display": "Luxemburg 1 LUX"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 10,
                "display": "Teteven BGR"
              }
            ]
          },
          {
            "dg": 6,
            "from": "08:50",
            "to": "09:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 11,
                "display": "Maskun FIN"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 12,
                "display": "Oise FR"
              }
            ]
          },
          {
            "dg": 7,
            "from": "09:00",
            "to": "09:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 13,
                "display": "Trentino ITA"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 14,
                "display": "Bludov CZ"
              }
            ]
          },
          {
            "dg": 8,
            "from": "09:10",
            "to": "09:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 15,
                "display": "MDP MIEJSCE ODRZAŃSKIE POL"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 16,
                "display": "BREZOI, VÂLCEA COUNTY RU"
              }
            ]
          },
          {
            "dg": 9,
            "from": "09:20",
            "to": "09:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 17,
                "display": "DRENOV GRIČ - LES. B. SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 18,
                "display": "Japan 1 JPN"
              }
            ]
          },
          {
            "dg": 10,
            "from": "09:30",
            "to": "09:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 19,
                "display": "Winden Windegg AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 20,
                "display": "Liechtenstein LIE"
              }
            ]
          },
          {
            "dg": 11,
            "from": "09:40",
            "to": "09:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 21,
                "display": "DVD NOVI MAROF HR"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 22,
                "display": "Kyustendil BGR"
              }
            ]
          },
          {
            "dg": 12,
            "from": "09:50",
            "to": "10:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 23,
                "display": "Luxemburg 2 LUX"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 24,
                "display": "Yvelines M FR"
              }
            ]
          },
          {
            "dg": 13,
            "from": "10:00",
            "to": "10:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 25,
                "display": "Trentino 1 Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 26,
                "display": "Bludov - FEMALE Fem. CZ"
              }
            ]
          },
          {
            "dg": 14,
            "from": "10:10",
            "to": "10:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 27,
                "display": "MDP DOBRA POL"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 28,
                "display": "NEAMȚ COUNTY RU"
              }
            ]
          },
          {
            "dg": 15,
            "from": "10:20",
            "to": "10:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 29,
                "display": "DRENOV GRIČ - LE. BR. SLO Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 30,
                "display": "International 1"
              }
            ]
          },
          {
            "dg": 16,
            "from": "10:30",
            "to": "10:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 31,
                "display": "St. Martin i. M. AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 32,
                "display": "Ukraine 1 UKR"
              }
            ]
          },
          {
            "dg": 17,
            "from": "10:40",
            "to": "10:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 33,
                "display": "DVD KOPRIVNICA HR Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 34,
                "display": "Lom BGR"
              }
            ]
          },
          {
            "dg": 18,
            "from": "10:50",
            "to": "11:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 35,
                "display": "Herala-Iitti FIN Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 36,
                "display": "JSP Sain Marice de Beynost FR"
              }
            ]
          },
          {
            "dg": 19,
            "from": "11:00",
            "to": "11:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 37,
                "display": "REBORDOSA PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 38,
                "display": "Pisková Lhota CZ"
              }
            ]
          },
          {
            "dg": 20,
            "from": "11:10",
            "to": "11:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 39,
                "display": "Oberneukirchen 2 GER Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 40,
                "display": "Antholt Mittertal Südt. ITA"
              }
            ]
          },
          {
            "dg": 21,
            "from": "11:20",
            "to": "11:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 41,
                "display": "Mitteregg-Haagen-Sand AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 42,
                "display": "VÉRTESSOMLÓI ÓTE L. HU Fem."
              }
            ]
          },
          {
            "dg": 22,
            "from": "11:30",
            "to": "11:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 43,
                "display": "DVD Ostrana HR"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 44,
                "display": "Chlumec na Cidlinou CZ"
              }
            ]
          },
          {
            "dg": 23,
            "from": "11:40",
            "to": "11:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 24,
            "from": "11:50",
            "to": "12:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 25,
            "from": "12:00",
            "to": "12:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 26,
            "from": "12:10",
            "to": "12:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 45,
                "display": "Dassendorf GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 46,
                "display": "DHZ Veľký Lapáš SK Fem."
              }
            ]
          },
          {
            "dg": 27,
            "from": "12:20",
            "to": "12:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 47,
                "display": "Glogonj Fem. SRB"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 48,
                "display": "KURD ÖTE LEÁNY HU Fem."
              }
            ]
          },
          {
            "dg": 28,
            "from": "12:30",
            "to": "12:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 49,
                "display": "International 2"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 50,
                "display": "International 3"
              }
            ]
          },
          {
            "dg": 29,
            "from": "12:40",
            "to": "12:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 51,
                "display": "Brandsprinter Pizol CH"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 52,
                "display": "DHZ Veľká Hradná SK"
              }
            ]
          },
          {
            "dg": 30,
            "from": "12:50",
            "to": "13:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 53,
                "display": "REBORDOSA Fem. PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 54,
                "display": "Schweden 1 SWE"
              }
            ]
          },
          {
            "dg": 31,
            "from": "13:00",
            "to": "13:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 55,
                "display": "Kovin SRB"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 56,
                "display": "VÉRTESSOMLÓI ÓTE FIÚ HU"
              }
            ]
          },
          {
            "dg": 32,
            "from": "13:10",
            "to": "13:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 57,
                "display": "Oberneukirchen 1 GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 58,
                "display": "DHZ Šuňava SK"
              }
            ]
          }
        ]
      },
      {
        "discipline": "Hindernisbahn",
        "lanes": [
          "Bahn 1",
          "Bahn 2",
          "Bahn 3",
          "Bahn 4"
        ],
        "timeMode": "from_to",
        "runs": [
          {
            "dg": 1,
            "from": "08:30",
            "to": "08:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 1,
                "display": "Kauklahden FIN"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 2,
                "display": "SATU MARE RU"
              }
            ]
          },
          {
            "dg": 2,
            "from": "08:40",
            "to": "09:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 3,
                "display": "MDP PRZYTKOWICE Fem. POL"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 4,
                "display": "Pisková Lhota Fem. CZ"
              }
            ]
          },
          {
            "dg": 3,
            "from": "08:50",
            "to": "09:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 5,
                "display": "ZGORNJI TUHINJ SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 6,
                "display": "Japan 2 JPN Fem."
              }
            ]
          },
          {
            "dg": 4,
            "from": "09:00",
            "to": "09:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 7,
                "display": "Guggenberg AUT"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 8,
                "display": "Manchester UK"
              }
            ]
          },
          {
            "dg": 5,
            "from": "09:10",
            "to": "09:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 9,
                "display": "Luxemburg 1 LUX"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 10,
                "display": "Teteven BGR"
              }
            ]
          },
          {
            "dg": 6,
            "from": "09:20",
            "to": "09:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 11,
                "display": "Maskun FIN"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 12,
                "display": "Oise FR"
              }
            ]
          },
          {
            "dg": 7,
            "from": "09:30",
            "to": "09:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 13,
                "display": "Trentino ITA"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 14,
                "display": "Bludov CZ"
              }
            ]
          },
          {
            "dg": 8,
            "from": "09:40",
            "to": "10:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 15,
                "display": "MDP MIEJSCE ODRZAŃSKIE POL"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 16,
                "display": "BREZOI, VÂLCEA COUNTY RU"
              }
            ]
          },
          {
            "dg": 9,
            "from": "09:50",
            "to": "10:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 17,
                "display": "DRENOV GRIČ - LES. B. SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 18,
                "display": "Japan 1 JPN"
              }
            ]
          },
          {
            "dg": 10,
            "from": "10:00",
            "to": "10:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 19,
                "display": "Winden Windegg AUT"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 20,
                "display": "Liechtenstein LIE"
              }
            ]
          },
          {
            "dg": 11,
            "from": "10:10",
            "to": "10:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 21,
                "display": "DVD NOVI MAROF HR"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 22,
                "display": "Kyustendil BGR"
              }
            ]
          },
          {
            "dg": 12,
            "from": "10:20",
            "to": "10:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 23,
                "display": "Luxemburg 2 LUX"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 24,
                "display": "Yvelines M FR"
              }
            ]
          },
          {
            "dg": 13,
            "from": "10:30",
            "to": "10:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 25,
                "display": "Trentino 1 Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 26,
                "display": "Bludov - FEMALE Fem. CZ"
              }
            ]
          },
          {
            "dg": 14,
            "from": "10:40",
            "to": "11:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 27,
                "display": "MDP DOBRA POL"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 28,
                "display": "NEAMȚ COUNTY RU"
              }
            ]
          },
          {
            "dg": 15,
            "from": "10:50",
            "to": "11:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 29,
                "display": "DRENOV GRIČ - LE. BR. SLO Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 30,
                "display": "International 1"
              }
            ]
          },
          {
            "dg": 16,
            "from": "11:00",
            "to": "11:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 31,
                "display": "St. Martin i. M. AUT"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 32,
                "display": "Ukraine 1 UKR"
              }
            ]
          },
          {
            "dg": 17,
            "from": "11:10",
            "to": "11:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 33,
                "display": "DVD KOPRIVNICA HR Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 34,
                "display": "Lom BGR"
              }
            ]
          },
          {
            "dg": 18,
            "from": "11:20",
            "to": "11:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 35,
                "display": "Herala-Iitti FIN Fem."
              },
              {
                "lane": "Bahn 4",
                "teamNr": 36,
                "display": "JSP Sain Marice de Beynost FR"
              }
            ]
          },
          {
            "dg": 19,
            "from": "11:30",
            "to": "11:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 37,
                "display": "REBORDOSA PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 38,
                "display": "Pisková Lhota CZ"
              }
            ]
          },
          {
            "dg": 20,
            "from": "11:40",
            "to": "12:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 39,
                "display": "Oberneukirchen 2 GER Fem."
              },
              {
                "lane": "Bahn 4",
                "teamNr": 40,
                "display": "Antholt Mittertal Südt. ITA"
              }
            ]
          },
          {
            "dg": 21,
            "from": "11:50",
            "to": "12:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 41,
                "display": "Mitteregg-Haagen-Sand AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 42,
                "display": "VÉRTESSOMLÓI ÓTE L. HU Fem."
              }
            ]
          },
          {
            "dg": 22,
            "from": "12:00",
            "to": "12:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 43,
                "display": "DVD Ostrana HR"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 44,
                "display": "Chlumec na Cidlinou CZ"
              }
            ]
          },
          {
            "dg": 23,
            "from": "12:10",
            "to": "12:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 24,
            "from": "12:20",
            "to": "12:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "pause": true
              },
              {
                "lane": "Bahn 4",
                "pause": true
              }
            ]
          },
          {
            "dg": 25,
            "from": "12:30",
            "to": "12:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 26,
            "from": "12:40",
            "to": "13:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "pause": true
              },
              {
                "lane": "Bahn 4",
                "pause": true
              }
            ]
          },
          {
            "dg": 27,
            "from": "12:50",
            "to": "13:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 45,
                "display": "Dassendorf GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 46,
                "display": "DHZ Veľký Lapáš SK Fem."
              }
            ]
          },
          {
            "dg": 28,
            "from": "13:00",
            "to": "13:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 47,
                "display": "Glogonj Fem. SRB"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 48,
                "display": "KURD ÖTE LEÁNY HU Fem."
              }
            ]
          },
          {
            "dg": 29,
            "from": "13:10",
            "to": "13:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 49,
                "display": "International 2"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 50,
                "display": "International 3"
              }
            ]
          },
          {
            "dg": 30,
            "from": "13:20",
            "to": "13:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 51,
                "display": "Brandsprinter Pizol CH"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 52,
                "display": "DHZ Veľká Hradná SK"
              }
            ]
          },
          {
            "dg": 31,
            "from": "13:30",
            "to": "13:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 53,
                "display": "REBORDOSA Fem. PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 54,
                "display": "Schweden 1 SWE"
              }
            ]
          },
          {
            "dg": 32,
            "from": "13:40",
            "to": "14:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 55,
                "display": "Kovin SRB"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 56,
                "display": "VÉRTESSOMLÓI ÓTE FIÚ HU"
              }
            ]
          },
          {
            "dg": 33,
            "from": "13:50",
            "to": "14:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 57,
                "display": "Oberneukirchen 1 GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 58,
                "display": "DHZ Šuňava SK"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "date": "2026-07-16",
    "label": "WETTKAMPF",
    "type": "Wettkampf",
    "disciplines": [
      {
        "discipline": "Staffellauf",
        "lanes": [
          "Bahn 1",
          "Bahn 2"
        ],
        "timeMode": "start_only",
        "runs": [
          {
            "dg": 1,
            "time": "08:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 1,
                "display": "Kauklahden FIN"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 2,
                "display": "SATU MARE RU"
              }
            ]
          },
          {
            "dg": 2,
            "time": "08:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 3,
                "display": "MDP PRZYTKOWICE Fem. POL"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 4,
                "display": "Pisková Lhota Fem. CZ"
              }
            ]
          },
          {
            "dg": 3,
            "time": "08:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 5,
                "display": "ZGORNJI TUHINJ SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 6,
                "display": "Japan 2 JPN Fem."
              }
            ]
          },
          {
            "dg": 4,
            "time": "08:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 7,
                "display": "Guggenberg AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 8,
                "display": "Manchester UK"
              }
            ]
          },
          {
            "dg": 5,
            "time": "08:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 9,
                "display": "Luxemburg 1 LUX"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 10,
                "display": "Teteven BGR"
              }
            ]
          },
          {
            "dg": 6,
            "time": "08:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 11,
                "display": "Maskun FIN"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 12,
                "display": "Oise FR"
              }
            ]
          },
          {
            "dg": 7,
            "time": "09:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 13,
                "display": "Trentino ITA"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 14,
                "display": "Bludov CZ"
              }
            ]
          },
          {
            "dg": 8,
            "time": "09:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 15,
                "display": "MDP MIEJSCE ODRZAŃSKIE POL"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 16,
                "display": "BREZOI, VÂLCEA COUNTY RU"
              }
            ]
          },
          {
            "dg": 9,
            "time": "09:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 17,
                "display": "DRENOV GRIČ - LES. B. SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 18,
                "display": "Japan 1 JPN"
              }
            ]
          },
          {
            "dg": 10,
            "time": "09:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 19,
                "display": "Winden Windegg AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 20,
                "display": "Liechtenstein LIE"
              }
            ]
          },
          {
            "dg": 11,
            "time": "09:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 21,
                "display": "DVD NOVI MAROF HR"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 22,
                "display": "Kyustendil BGR"
              }
            ]
          },
          {
            "dg": 12,
            "time": "09:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 23,
                "display": "Luxemburg 2 LUX"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 24,
                "display": "Yvelines M FR"
              }
            ]
          },
          {
            "dg": 13,
            "time": "10:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 25,
                "display": "Trentino 1 Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 26,
                "display": "Bludov - FEMALE Fem. CZ"
              }
            ]
          },
          {
            "dg": 14,
            "time": "10:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 27,
                "display": "MDP DOBRA POL"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 28,
                "display": "NEAMȚ COUNTY RU"
              }
            ]
          },
          {
            "dg": 15,
            "time": "10:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 29,
                "display": "DRENOV GRIČ - LE. BR. SLO Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 30,
                "display": "International 1"
              }
            ]
          },
          {
            "dg": 16,
            "time": "10:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 31,
                "display": "St. Martin i. M. AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 32,
                "display": "Ukraine 1 UKR"
              }
            ]
          },
          {
            "dg": 17,
            "time": "10:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 33,
                "display": "DVD KOPRIVNICA HR Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 34,
                "display": "Lom BGR"
              }
            ]
          },
          {
            "dg": 18,
            "time": "10:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 35,
                "display": "Herala-Iitti FIN Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 36,
                "display": "JSP Sain Marice de Beynost FR"
              }
            ]
          },
          {
            "dg": 19,
            "time": "11:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 37,
                "display": "REBORDOSA PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 38,
                "display": "Pisková Lhota CZ"
              }
            ]
          },
          {
            "dg": 20,
            "time": "11:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 39,
                "display": "Oberneukirchen 2 GER Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 40,
                "display": "Antholt Mittertal Südt. ITA"
              }
            ]
          },
          {
            "dg": 21,
            "time": "11:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 41,
                "display": "Mitteregg-Haagen-Sand AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 42,
                "display": "VÉRTESSOMLÓI ÓTE L. HU Fem."
              }
            ]
          },
          {
            "dg": 22,
            "time": "11:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 43,
                "display": "DVD Ostrana HR"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 44,
                "display": "Chlumec na Cidlinou CZ"
              }
            ]
          },
          {
            "dg": 23,
            "time": "11:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 24,
            "time": "11:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 25,
            "time": "12:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 26,
            "time": "12:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 45,
                "display": "Dassendorf GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 46,
                "display": "DHZ Veľký Lapáš SK Fem."
              }
            ]
          },
          {
            "dg": 27,
            "time": "12:20",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 47,
                "display": "Glogonj Fem. SRB"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 48,
                "display": "KURD ÖTE LEÁNY HU Fem."
              }
            ]
          },
          {
            "dg": 28,
            "time": "12:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 49,
                "display": "International 2"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 50,
                "display": "International 3"
              }
            ]
          },
          {
            "dg": 29,
            "time": "12:40",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 51,
                "display": "Brandsprinter Pizol CH"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 52,
                "display": "DHZ Veľká Hradná SK"
              }
            ]
          },
          {
            "dg": 30,
            "time": "12:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 53,
                "display": "REBORDOSA Fem. PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 54,
                "display": "Schweden 1 SWE"
              }
            ]
          },
          {
            "dg": 31,
            "time": "13:00",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 55,
                "display": "Kovin SRB"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 56,
                "display": "VÉRTESSOMLÓI ÓTE FIÚ HU"
              }
            ]
          },
          {
            "dg": 32,
            "time": "13:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 57,
                "display": "Oberneukirchen 1 GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 58,
                "display": "DHZ Šuňava SK"
              }
            ]
          }
        ]
      },
      {
        "discipline": "Hindernisbahn",
        "lanes": [
          "Bahn 1",
          "Bahn 2",
          "Bahn 3",
          "Bahn 4"
        ],
        "timeMode": "start_only",
        "runs": [
          {
            "dg": 1,
            "time": "08:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 1,
                "display": "Kauklahden FIN"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 2,
                "display": "SATU MARE RU"
              }
            ]
          },
          {
            "dg": 2,
            "time": "08:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 3,
                "display": "MDP PRZYTKOWICE Fem. POL"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 4,
                "display": "Pisková Lhota Fem. CZ"
              }
            ]
          },
          {
            "dg": 3,
            "time": "08:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 5,
                "display": "ZGORNJI TUHINJ SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 6,
                "display": "Japan 2 JPN Fem."
              }
            ]
          },
          {
            "dg": 4,
            "time": "09:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 7,
                "display": "Guggenberg AUT"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 8,
                "display": "Manchester UK"
              }
            ]
          },
          {
            "dg": 5,
            "time": "09:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 9,
                "display": "Luxemburg 1 LUX"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 10,
                "display": "Teteven BGR"
              }
            ]
          },
          {
            "dg": 6,
            "time": "09:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 11,
                "display": "Maskun FIN"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 12,
                "display": "Oise FR"
              }
            ]
          },
          {
            "dg": 7,
            "time": "09:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 13,
                "display": "Trentino ITA"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 14,
                "display": "Bludov CZ"
              }
            ]
          },
          {
            "dg": 8,
            "time": "09:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 15,
                "display": "MDP MIEJSCE ODRZAŃSKIE POL"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 16,
                "display": "BREZOI, VÂLCEA COUNTY RU"
              }
            ]
          },
          {
            "dg": 9,
            "time": "09:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 17,
                "display": "DRENOV GRIČ - LES. B. SLO"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 18,
                "display": "Japan 1 JPN"
              }
            ]
          },
          {
            "dg": 10,
            "time": "10:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 19,
                "display": "Winden Windegg AUT"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 20,
                "display": "Liechtenstein LIE"
              }
            ]
          },
          {
            "dg": 11,
            "time": "10:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 21,
                "display": "DVD NOVI MAROF HR"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 22,
                "display": "Kyustendil BGR"
              }
            ]
          },
          {
            "dg": 12,
            "time": "10:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 23,
                "display": "Luxemburg 2 LUX"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 24,
                "display": "Yvelines M FR"
              }
            ]
          },
          {
            "dg": 13,
            "time": "10:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 25,
                "display": "Trentino 1 Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 26,
                "display": "Bludov - FEMALE Fem. CZ"
              }
            ]
          },
          {
            "dg": 14,
            "time": "10:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 27,
                "display": "MDP DOBRA POL"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 28,
                "display": "NEAMȚ COUNTY RU"
              }
            ]
          },
          {
            "dg": 15,
            "time": "10:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 29,
                "display": "DRENOV GRIČ - LE. BR. SLO Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 30,
                "display": "International 1"
              }
            ]
          },
          {
            "dg": 16,
            "time": "11:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 31,
                "display": "St. Martin i. M. AUT"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 32,
                "display": "Ukraine 1 UKR"
              }
            ]
          },
          {
            "dg": 17,
            "time": "11:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 33,
                "display": "DVD KOPRIVNICA HR Fem."
              },
              {
                "lane": "Bahn 2",
                "teamNr": 34,
                "display": "Lom BGR"
              }
            ]
          },
          {
            "dg": 18,
            "time": "11:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 35,
                "display": "Herala-Iitti FIN Fem."
              },
              {
                "lane": "Bahn 4",
                "teamNr": 36,
                "display": "JSP Sain Marice de Beynost FR"
              }
            ]
          },
          {
            "dg": 19,
            "time": "11:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 37,
                "display": "REBORDOSA PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 38,
                "display": "Pisková Lhota CZ"
              }
            ]
          },
          {
            "dg": 20,
            "time": "11:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 39,
                "display": "Oberneukirchen 2 GER Fem."
              },
              {
                "lane": "Bahn 4",
                "teamNr": 40,
                "display": "Antholt Mittertal Südt. ITA"
              }
            ]
          },
          {
            "dg": 21,
            "time": "11:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 41,
                "display": "Mitteregg-Haagen-Sand AUT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 42,
                "display": "VÉRTESSOMLÓI ÓTE L. HU Fem."
              }
            ]
          },
          {
            "dg": 22,
            "time": "12:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 43,
                "display": "DVD Ostrana HR"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 44,
                "display": "Chlumec na Cidlinou CZ"
              }
            ]
          },
          {
            "dg": 23,
            "time": "12:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 24,
            "time": "12:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "pause": true
              },
              {
                "lane": "Bahn 4",
                "pause": true
              }
            ]
          },
          {
            "dg": 25,
            "time": "12:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "pause": true
              },
              {
                "lane": "Bahn 2",
                "pause": true
              }
            ]
          },
          {
            "dg": 26,
            "time": "12:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "pause": true
              },
              {
                "lane": "Bahn 4",
                "pause": true
              }
            ]
          },
          {
            "dg": 27,
            "time": "12:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 45,
                "display": "Dassendorf GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 46,
                "display": "DHZ Veľký Lapáš SK Fem."
              }
            ]
          },
          {
            "dg": 28,
            "time": "13:00",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 47,
                "display": "Glogonj Fem. SRB"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 48,
                "display": "KURD ÖTE LEÁNY HU Fem."
              }
            ]
          },
          {
            "dg": 29,
            "time": "13:10",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 49,
                "display": "International 2"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 50,
                "display": "International 3"
              }
            ]
          },
          {
            "dg": 30,
            "time": "13:20",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 51,
                "display": "Brandsprinter Pizol CH"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 52,
                "display": "DHZ Veľká Hradná SK"
              }
            ]
          },
          {
            "dg": 31,
            "time": "13:30",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 53,
                "display": "REBORDOSA Fem. PT"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 54,
                "display": "Schweden 1 SWE"
              }
            ]
          },
          {
            "dg": 32,
            "time": "13:40",
            "entries": [
              {
                "lane": "Bahn 3",
                "teamNr": 55,
                "display": "Kovin SRB"
              },
              {
                "lane": "Bahn 4",
                "teamNr": 56,
                "display": "VÉRTESSOMLÓI ÓTE FIÚ HU"
              }
            ]
          },
          {
            "dg": 33,
            "time": "13:50",
            "entries": [
              {
                "lane": "Bahn 1",
                "teamNr": 57,
                "display": "Oberneukirchen 1 GER"
              },
              {
                "lane": "Bahn 2",
                "teamNr": 58,
                "display": "DHZ Šuňava SK"
              }
            ]
          }
        ]
      }
    ]
  }
];
