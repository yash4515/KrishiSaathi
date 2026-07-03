KrishiSaathi — Project Context File

Repository: https://github.com/yash4515/KrishiSaathi
Tagline: "Krishi Saathi" means "farmer's friend" in Hindi — a name chosen to convey trust and support.


1. Project Overview

KrishiSaathi is a farmer-centric digital platform that connects farmers directly with buyers, cutting out middlemen in the agricultural supply chain. It combines a real-time crop marketplace with supporting tools (crop advisory, insurance applications, multilingual support) to help farmers get fairer prices and easier access to services.

Problem it solves: Farmers in India often lose income to middlemen and lack direct access to buyers, real-time price discovery, or digital tools suited to their language and literacy level.

Target users: Small and marginal farmers, agricultural buyers/traders, and (secondarily) admins managing the platform.


2. Core Features


Farmer–Buyer Marketplace: Farmers list crops; buyers browse and place bids.
Real-Time Bidding: Live bid updates powered by Socket.IO.
Order Lifecycle Management: From bid acceptance → payment → delivery tracking.
Crop Insurance Applications: Farmers can apply for insurance through the platform.
Multilingual Support: UI available in English, Hindi, and Marathi (via i18next) for regional accessibility.
Chat/Support System: Real-time communication between users.
Role-Based Access: Separate flows for Farmer, Buyer, and Admin roles.
(Supplementary) AI Crop Advisory: A lightweight AI module offering crop health guidance, layered on top of the core marketplace — not the primary focus of the platform.



3. Tech Stack

LayerTechnologiesFrontendReact 19, Vite, TailwindCSS, Framer Motion, i18nextBackendNode.js, Express 5, MongoDB, Mongoose, JWT Authentication, Socket.IOStorageCloudinary (image storage & CDN delivery)PaymentsRazorpayDatabaseMongoDB Atlas (managed, cloud-hosted)DeploymentVercel (frontend), Render (backend), MongoDB Atlas (database)


4. Architecture

KrishiSaathi follows a decoupled client–server architecture:


Frontend (React + Vite): Handles UI/UX, crop listings, bidding interface, multilingual rendering, and communicates with the backend via REST APIs and WebSocket events.
Backend (Node.js + Express): Exposes REST APIs for auth, crop listings, orders, insurance, and payments. Manages business logic and data validation.
Database (MongoDB + Mongoose): Stores users, crop listings, bids, orders, and insurance records as structured schemas.
Real-Time Layer (Socket.IO): Powers live bidding updates and chat/support messaging.
External Services: Cloudinary for media storage/delivery; Razorpay for secure payment processing.


Authentication: Stateless JWT-based auth — tokens are verified per-request, requiring no server-side session storage.


5. Scalability Approach


Service Decoupling: Frontend, backend, and database scale independently, so traffic spikes in one layer (e.g., bidding during harvest season) don't bottleneck others.
Horizontal Scaling: MongoDB Atlas supports horizontal scaling as listings/users grow.
CDN Offloading: Cloudinary serves images via CDN, reducing load on application servers.
Stateless Auth: JWT allows the backend to be scaled across multiple instances without session-affinity issues.
Real-Time Scaling: Socket.IO supports adapters (e.g., Redis adapter) to scale live bidding/chat across multiple server nodes.
Managed Deployment: Vercel and Render provide auto-scaling infrastructure out of the box for frontend and backend respectivel