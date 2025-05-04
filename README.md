# ThemeIsle Internship Project

## Overview

This project is the result of the ThemeIsle Internship Test, focusing on modernizing and enhancing a digital currency application called BitSlow. The original application suffered from performance issues, poor user experience, and a lack of essential features like transaction filtering and a marketplace.

Leveraging a modern stack including **React, TypeScript, Vite, and Tailwind CSS** for the frontend and **Bun** for the backend, this project delivers a comprehensive solution. It addresses the initial shortcomings by implementing secure user authentication and registration, a feature-rich dashboard with dark mode, an improved transaction dashboard with robust filtering and pagination, performance optimizations, and a dynamic marketplace for buying and generating BitSlow coins. The goal was to create a responsive, intuitive, efficient, and visually appealing web application.

## Features

* **User Authentication & Authorization:**
    * Secure sign-up and login pages with robust input validation.
    * Password hashing and secure storage.
    * JWT-based authentication for secure access to protected routes.
    * Loading indicators during authentication processes.

* **Dashboard with Dark Mode:**
    * Intuitive main dashboard providing access to different sections of the application.
    * Toggleable dark mode for improved user experience based on preference.

* **Navigation:**
    * Clear navigation structure including Home, Profile, Marketplace, and Transactions pages.

* **Profile Page:**
    * Displays user-specific financial data at a glance.
    * Shows the **Total number of transactions** made by the user.
    * Indicates the **Total BitSlow coins owned** by the user.
    * Calculates and displays the **Total monetary value** of the user's BitSlow holdings (Portfolio Value).

* **BitSlow Marketplace:**
    * Dynamic dashboard listing available and owned BitSlows.
    * Table displaying coin details: Hash (Unique ID), Component Numbers, Monetary Value, and Current Owner.
    * **Pagination** to browse the marketplace list efficiently (30 coins per page).
    * **Filtering** option to specifically view only the coins owned by the logged-in user.
    * **"Buy" button** for unowned BitSlows, triggering a transaction and ownership transfer.
    * **"Generate Coin" button:** Opens a modal allowing users to input an amount to generate a new BitSlow coin with a unique component combination. The button disappears if no unique combinations remain.
    * **Ownership History Modal:** A "History" button for each coin opens a modal displaying the complete ownership history based on transaction records.

* **Transactions Page:**
    * Comprehensive table listing all transactions.
    * Displays transaction details: Coin ID (Hash), Seller, Buyer, Amount, and Date.
    * **Robust Filtering:** Allows filtering transactions by Coin ID, Seller, Buyer, Amount, and Date.
    * **Pagination:** Enables browsing through the transaction history with pagination controls.

* **Performance & User Experience:**
    * Optimized loading speed throughout the application.
    * Clear and informative error messages communicated to the UI.
    * Visual indicators (e.g., loading spinners, success/error messages) providing real-time feedback to the user.
    * Responsive design ensuring optimal viewing and interaction on various devices (desktops, tablets, and mobile phones).

## Technologies

* **Frontend:**
    * **React:** For building the user interface components.
    * **TypeScript:** Adding static typing for improved code quality and maintainability.
    * **Vite:** As the build tool for a fast development experience.
    * **Tailwind CSS:** For rapid and responsive UI styling.
    * *(Mention any other significant frontend libraries, e.g., for state management if not using React Context, date handling, etc.)*

* **Backend:**
    * **Bun:** Used as the JavaScript runtime and package manager, handling server-side logic and API endpoints.
    * **SQLite:** Used as the database for storing application data, including users, coins, and transactions.
    * *(Mention any other significant backend libraries, e.g., for hashing, JWT handling, etc.)*

## Setup Instructions

Follow these steps to run the application locally.

### Prerequisites

* Bun installed on your system.

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <Your Repository URL Here>
    cd <Your Project Folder Name>
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Start the development server**:

    ```bash
    bun dev
    ```

The application should now be running on the address indicated in your console output (typically `http://localhost:3000`).

*(Optional: Add instructions for running tests, formatting, or linting if desired)*
