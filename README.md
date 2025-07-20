# 📊 Viac Portfolio Performance API

Dieses Projekt ermöglicht es, **automatisiert die Portfolioentwicklung eines Viac 3a-Kontos** abzufragen und als REST-API bereitzustellen. Ideal für eigene Dashboards, Visualisierungen oder Automatisierungen.

> ⚠️ Achtung: Du benötigst deine persönlichen Zugangsdaten (Mobile + Passwort), um dein Portfolio abzufragen.
> 
> ⚠️ Achtung: Portfolio Performance zwischenspeichert die Kurse. Daher wird empfohlen, mit der `relativePerformance` zu arbeiten. Initial den investierten Betrag von heute als Anteile an je 1 Fr. Nach einer Zeit kann man die Anteile jeweils nachziehen.
>
> Beispiel: Wenn der investierte Betrag 5000 CHF ist, dann 5000 Anteile zu 1 Fr kaufen am ersten Tag. Nach 2–3 Jahren hat man z. B. 15000 CHF und würde dann die Buchung auf 15000 Anteile ändern.


---

## 🚀 Features

- Automatisierter Login bei [viac.ch](https://viac.ch)
- Abruf der täglichen Portfolio-Werte deines 3a-Kontos
- REST-Endpoint: `/viac/daily-wealth?portfolio=0` → gibt das gewünschte Portfolio zurück
- Cookie-Management & CSRF-Unterstützung
- Bereit zur Selbst-Hostung

---

## 🛠️ Installation

```bash
git clone https://github.com/faragos/viac-portfolio-performance-api.git
cd viac-portfolio-performance-api
cp .default-env .env
npm install
```

Anschließend `.env` Datei bearbeiten:

```env
VIAC_USERNAME=+41791234567
VIAC_PASSWORD=deinGeheimesPasswort123
VIAC_CSRF_TOKEN= # optional; kann leer bleiben (bis jetzt)
PORT=3000
```

> 🔐 **Sicherheit**: Diese Daten verbleiben ausschließlich lokal auf deinem Server. Gib sie niemals an Dritte weiter.

---

## ▶️ Starten

```bash
npm run start
```

Die API läuft dann unter:

```
http://localhost:3000/viac/daily-wealth?portfolio=1
```

> `portfolio` steht für dein Portfolio-index (z. B. 0, 1 oder 2 – falls du mehrere hast)

---

## 🧪 Beispiel-Antwort

```json
{
  "data": [{
    "date": "2022-11-24",
    "realPerformance": 27.14,
    "investedValue": 25000.00,
    "todaysValue": 25027.14,
    "relativePerformance": 1.0011},
  ]
}
```

---

## 🧱 Tech-Stack

- Node.js
- Express
- Axios mit CookieJar
- dotenv

---

## 🛡️ Sicherheit & Verantwortung

Diese API verwendet deine **privaten Zugangsdaten** zur Viac-Plattform. Stelle sicher, dass:

- dein Server ausreichend gesichert ist (Firewall, Auth etc.)
- du die `.env` Datei **niemals ins Git-Repository** eincheckst
- du die Daten **nur für dich selbst verwendest**

---

## 🙋‍♂️ Haftungsausschluss

Dieses Projekt steht in **keiner Verbindung zu Viac**. Die Nutzung erfolgt auf eigene Gefahr. Viac könnte die API jederzeit ändern oder blockieren.

---

## 📄 Lizenz

[MIT](LICENSE)

---

## ✨ Autor

- 👤 Marco Endres – [endres.ch](https://finanzen.endres.ch)

---

## 💡 Ideen für die Zukunft

- OAuth 2.0 Unterstützung (falls Viac es je anbietet)

