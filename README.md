# Farm Animal Management

Farm Animal Management is a user-friendly platform designed to streamline the registration of farms and animals, while also offering powerful tools for generating detailed reports. With its intuitive interface, users can easily manage farm data, track animal information, and gain valuable insights through customized reports.

---

## **Technologies used**

- **Frontend**: Angular with Typescript.

## **How to Run the Backend**

### **1. Prerequisites**

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **2. Environment Configuration**

1. Clone the repository:

   ```bash
   git clone https://github.com/gabrielpellizzon/farm-animal-management.git

   cd farm-animal-management
   ```

2. Installing all dependencies:

   Run the following npm command

```bash
   npm install
```

## **Running the Frontend**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

To run the project, execute de command:

```bash
   ng serve
```

Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Project Structure

```plaintext
farm-animal-management/
│ └── src/
│ └── angular.json
│ └── package.json
│ └── package-lock.json
│ └── README.md
│ └── .gitignore
└──
```

## Off-topic

The API had a problem after creating animals. To get around the situation, a function was created within my `farm-list.component.ts` file called `mockAnimalsForFarms`.
