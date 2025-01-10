# Jana Sewa

Jana Sewa is a modern platform designed to streamline the process of resolving and tracking complaints within a community. The app provides an intuitive interface for users to report, manage, and monitor issues efficiently while ensuring transparency and accountability.

---

## **Features**
- **User Authentication**: Secure login and registration using JSON Web Tokens (JWT).
- **Complaint Management**: Users can report, view, and track complaints related to their community.
- **User-Friendly UI**: A user-friendly interface built with React and enhanced with animations.
- **Notifications**: Real-time notifications for updates using React-Toastify.

---

## **Tech Stack**

### **Frontend**
- **React**: Framework for building the user interface.
- **Axios**: For making HTTP requests to the backend API.
- **GSAP**: For creating smooth animations.
- **React-Toastify**: For customizable and easy-to-use toast notifications.

### **Backend**
- **Django**: Backend framework for handling server-side operations.
- **Django REST Framework (DRF)**: For building RESTful APIs.
- **Simple JWT**: For JSON Web Token-based authentication.
- **Django CORS Headers**: For handling Cross-Origin Resource Sharing (CORS).

---

## **Getting Started**

### **Prerequisites**
The following needs to be installed:
- Node.js and npm
- Python 3.x and pip
- A virtual environment manager

---

### **Frontend Setup**
1. Navigate to the `frontend` directory:
   cd frontend

2. Install all the dependencies:
    npm install


### **Backend Setup**
1. Navigate to the `backend` directory:
   cd backend

2. Create and activate virtual environment:
    python -m venv venv
    venv\Scripts\activates

3. Install the following packages:
    pip install django django-rest-framework djangorestframework-simplejwt django-cors-headers
