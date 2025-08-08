# HOUND EXPRESS – Client-Side Shipping Guide Tracking Application

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## Preview
<!-- Agrega aquí una imagen o GIF de previsualización -->
<img src="https://github.com/YisusDU/ebac-ea-m21-js/blob/main/assets/IMG/hx-preview.webp" alt="general preview">

---

## 📋 Purpose and Scope

HOUND EXPRESS is a **client-side web application** focused on managing shipping guide tracking and package logistics.  
It allows users to:

- Register new shipping guides.
- Track guide status through stages: Pending, In Transit, Delivered.
- Maintain full audit history of status changes.

The app runs fully in the browser with no backend dependencies, storing data in an in-memory JavaScript array during the session.

---

## 🏗 System Architecture

- Traditional client-side architecture with separation of concerns: presentation, logic, styling.
- Central data model stored in the `guideList` array.
- Each guide tracks status changes in the nested `guide__stage` array.
- Modal-based UI for editing and viewing history.
- Event-driven dynamic DOM manipulation for interactivity.

---

## ⚙️ Core Functional Components

| Function              | Purpose                 | Key Operations                                  |
|-----------------------|-------------------------|------------------------------------------------|
| `validateFields()`    | Form validation         | Checks empty inputs, applies error styles       |
| `paintTable()`        | UI rendering            | Generates table rows dynamically from `guideList` |
| `updateGeneralState()`| Statistics calculation  | Counts guides by status categories               |
| `renderTableModal()`  | Modal management        | Populates modal tables with guide history data  |

---

## 🖱 User Interface Event Handling

- Form submissions with validation.
- Modal open/close and data synchronization.
- Mobile navigation and responsive behavior.
- DOM updates reflecting current guide data.

---

## 🗂 Modal System Architecture

- Dual modal system for updating guide status and viewing history.
- Ensures data validation and state consistency.
- Enhances user experience without page reloads.

---

## 🔄 Application Flow

- User actions trigger state updates in `guideList`.
- UI components re-render dynamically to reflect changes.
- Modal interactions maintain data integrity and allow detailed guide editing.

---

## 📂 Project Structure
```
hound-express/
├── index.html # Main HTML page
├── JS/
│ └── scripts.js # JavaScript logic, event handling, and modal management
└── readme.txt # Original project documentation
```


---

## 🚀 Development and Usage

1. Open `index.html` in a modern browser.
2. Register and track shipping guides through the UI.
3. Use modals to update statuses and view history.
4. View real-time statistics on guide states.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

> [!Note]
> You can check the full documentation [-here-](https://deepwiki.com/YisusDU/ebac-ea-m21-js)
