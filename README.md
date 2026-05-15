Battery Rental Platform
A full-stack battery rental web application built end-to-end during my Master's program. Customers can browse available batteries, rent them with secure online payment, and a separate admin dashboard manages the inventory.
🎯 What It Does
Customer Side:

Browse available batteries by location and capacity
Rent batteries with Stripe-integrated checkout
View rental history and active rentals

Admin Side (B-Charge):

Manage battery inventory and availability
Track rental transactions and revenue
View customer activity dashboard

🛠️ Tech Stack
LayerTechnologyBackendNode.js / ExpressFrontend (Customer)JavaScript / HTML / CSSFrontend (Admin)B-Charge dashboardDatabaseMongoDB + MySQLPaymentsStripe APIDeploymentAWS (EC2, S3, Auto Scaling)AuthJWT-based authentication
📁 Project Structure
battery/
├── backend/              # Node.js/Express REST API server
├── frontend/             # Customer-facing rental application
└── frontend_B-Charge/    # Admin dashboard
🚀 Key Features Implemented

RESTful API design for rental, user, and payment endpoints
JWT-based authentication and role-based access (renter vs admin)
Stripe payment integration for transaction handling
MongoDB schema design for users, batteries, rentals, and payment records
AWS deployment with horizontal scaling support

🎓 What I Learned

Designing database schemas with foreign key relationships
Integrating third-party payment APIs (Stripe webhooks, idempotency)
Building separate frontends for distinct user roles
Cloud deployment and infrastructure management on AWS

🔮 Future Improvements

Migrate frontend to React/TypeScript for better state management
Add real-time battery availability tracking via WebSockets
Implement automated CI/CD pipeline with GitHub Actions
Add comprehensive test coverage
