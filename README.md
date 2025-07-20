# 📊 Viac Portfolio Performance API

Dieses Projekt ermöglicht es, **automatisiert die Portfolioentwicklung eines Viac 3a-Kontos** abzufragen und als REST-API bereitzustellen. Ideal für eigene Dashboards, Visualisierungen oder Automatisierungen.

> ⚠️ Achtung: Du benötigst deine persönlichen Zugangsdaten (Mobile + Passwort), um dein Portfolio abzufragen.

---

## 🚀 Features

- Automatisierter Login bei [viac.ch](https://viac.ch)
- Abruf der täglichen Portfolio-Werte deines 3a-Kontos
- REST-Endpoint: `/api/portfolio?portfolio=0` → gibt das gewünschte Portfolio zurück
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
[
  { "date": "2022-11-15", "value": 0 },
  { "date": "2022-11-16", "value": 6883 },
  { "date": "2022-11-24", "value": 6910.14 }
]
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

- 👤 Marco Endres – [endres.ch](https://endres.ch)

---

## 💡 Ideen für die Zukunft

- OAuth 2.0 Unterstützung (falls Viac es je anbietet)

