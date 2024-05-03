import {Aufgabe} from "@/api/aufgabe";
import {AxiosResponse} from "axios";
import {axiosClient} from "@/api/httpClient";

export type Raum = {
    id: string;
    name: string;
    beschreibung: string;
    aufgaben: Aufgabe[];
}

export const getRoomByIdApi = async (id: string): Promise<AxiosResponse<Raum>> => {
    return await axiosClient.get<Raum>(`/raeume/${id}`);
}

export const getAllRoomsApi = async (): Promise<AxiosResponse<Raum[]>> => {
    return await axiosClient.get<Raum[]>("/raeume/alle");
}

export const raeumeList: Raum[] = [
    {
        "id": "20000000-0000-0000-0000-000000000001",
        "name": "Raum 1",
        "beschreibung": "Beschreibung Raum 1",
        "aufgaben": [
            {
                "id": "30000000-0000-0000-0000-000000000001",
                "raumId": "20000000-0000-0000-0000-000000000001",
                "wert": "Was versteht man unter ACID ?",
                "zeitZuLoesen": 240,
                "beschreibung": "Beschreibung Aufgabe 1",
                "loesungen": [
                    {
                        "id": "40000000-0000-0000-0000-000000000001",
                        "wert": "Atomicity Consistency Isolation Durabilty",
                        "aufgabeId": "30000000-0000-0000-0000-000000000001"
                    }
                ],
                "gegenstaende": [
                    {
                        "id": "50000000-0000-0000-0000-000000000001",
                        "name": "Stein",
                        "beschreibung": "Gegenstand 1 Beschreibung 2",
                        "hinweis": "Gegenstand 1 Hinweis",
                        "greifbar": true
                    }
                ]
            }
        ]
    },
    {
        "id": "20000000-0000-0000-0000-000000000002",
        "name": "Raum 2",
        "beschreibung": "Beschreibung Raum 2",
        "aufgaben": [
            {
                "id": "30000000-0000-0000-0000-000000000002",
                "raumId": "20000000-0000-0000-0000-000000000002",
                "wert": "Erkläre die Begriffe IP und MAC-Adresse",
                "zeitZuLoesen": 240,
                "beschreibung": "Beschreibung Aufgabe 2",
                "loesungen": [
                    {
                        "id": "40000000-0000-0000-0000-000000000002",
                        "wert": "Die IP-Adresse (Internet Protocol) ist eine eindeutige Kennung, die einem Gerät in einem Netzwerk zugewiesen wird. Die MAC-Adresse (Media Access Control) ist eine eindeutige Kennung, die in die Hardware eines Netzwerkadapters eingebrannt ist.",
                        "aufgabeId": "30000000-0000-0000-0000-000000000002"
                    }
                ],
                "gegenstaende": [
                    {
                        "id": "50000000-0000-0000-0000-000000000001",
                        "name": "Stein",
                        "beschreibung": "Gegenstand 1 Beschreibung 2",
                        "hinweis": "Gegenstand 1 Hinweis",
                        "greifbar": true
                    },
                    {
                        "id": "50000000-0000-0000-0000-000000000002",
                        "name": "Baum",
                        "beschreibung": "Gegenstand 2 Beschreibung",
                        "hinweis": "Gegenstand 2 Hinweis",
                        "greifbar": true
                    }
                ]
            }
        ]
    },
    {
        "id": "20000000-0000-0000-0000-000000000003",
        "name": "Raum 3",
        "beschreibung": "Beschreibung Raum 3",
        "aufgaben": [
            {
                "id": "30000000-0000-0000-0000-000000000003",
                "raumId": "20000000-0000-0000-0000-000000000003",
                "wert": "Erkläre den Begriff \"Asynchrone Programmierung\"",
                "zeitZuLoesen": 240,
                "beschreibung": "Beschreibung Aufgabe 3",
                "loesungen": [
                    {
                        "id": "40000000-0000-0000-0000-000000000003",
                        "wert": "Asynchrone Programmierung ist ein Paradigma, bei dem Aufgaben gleichzeitig ausgeführt werden, ohne auf den Abschluss einer anderen Aufgabe zu warten.",
                        "aufgabeId": "30000000-0000-0000-0000-000000000003"
                    }
                ],
                "gegenstaende": [
                    {
                        "id": "50000000-0000-0000-0000-000000000003",
                        "name": "Tuer",
                        "beschreibung": "Gegenstand 3 Beschreibung",
                        "hinweis": "Gegenstand 3 Hinweis",
                        "greifbar": true
                    }
                ]
            }
        ]
    },
    {
        "id": "20000000-0000-0000-0000-000000000004",
        "name": "Raum 4",
        "beschreibung": "Beschreibung Raum 4",
        "aufgaben": [
            {
                "id": "30000000-0000-0000-0000-000000000004",
                "raumId": "20000000-0000-0000-0000-000000000004",
                "wert": "Was versteht man unter einem Lamda-Ausdruck ?",
                "zeitZuLoesen": 240,
                "beschreibung": "Beschreibung Aufgabe 4",
                "loesungen": [
                    {
                        "id": "40000000-0000-0000-0000-000000000004",
                        "wert": "Ein anonymer Ausdruck",
                        "aufgabeId": "30000000-0000-0000-0000-000000000004"
                    },
                    {
                        "id": "40000000-0000-0000-0000-000000000005",
                        "wert": "Eine Funktion ohne Namen",
                        "aufgabeId": "30000000-0000-0000-0000-000000000004"
                    }
                ],
                "gegenstaende": [
                    {
                        "id": "50000000-0000-0000-0000-000000000004",
                        "name": "Mauer",
                        "beschreibung": "Gegenstand 4 Beschreibung",
                        "hinweis": "Gegenstand 4 Hinweis",
                        "greifbar": true
                    }
                ]
            }
        ]
    },
    {
        "id": "20000000-0000-0000-0000-000000000005",
        "name": "Raum 5",
        "beschreibung": "Beschreibung Raum 5",
        "aufgaben": [
            {
                "id": "30000000-0000-0000-0000-000000000005",
                "raumId": "20000000-0000-0000-0000-000000000005",
                "wert": "Wer ist ein SCRUM-Master ?",
                "zeitZuLoesen": 240,
                "beschreibung": "Beschreibung Aufgabe 5",
                "loesungen": [
                    {
                        "id": "40000000-0000-0000-0000-000000000006",
                        "wert": "Ein Scrum Master fungiert als Vermittler und Führer innerhalb des Scrum-Rahmens, einer agilen Projektmanagement-Methode.",
                        "aufgabeId": "30000000-0000-0000-0000-000000000005"
                    }
                ],
                "gegenstaende": [
                    {
                        "id": "50000000-0000-0000-0000-000000000005",
                        "name": "Haus",
                        "beschreibung": "Gegenstand 5 Beschreibung",
                        "hinweis": "Gegenstand 5 Hinweis",
                        "greifbar": true
                    }
                ]
            }
        ]
    }
];
