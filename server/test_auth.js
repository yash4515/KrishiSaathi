require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const test = async () => {
    try {
        console.log('Connecting to MongoDB at:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected!');
        
        // Try creating a test user
        const email = `test_farmer_${Date.now()}@test.com`;
        console.log('Attempting to create user with email:', email);
        const user = await User.create({
            name: 'Test Farmer',
            email: email,
            phone: '9123456789',
            password: 'password123',
            role: 'farmer'
        });
        console.log('User created successfully:', user);
        
        // Clean up
        await User.deleteOne({ _id: user._id });
        console.log('Test user cleaned up.');
    } catch (error) {
        console.error('Test failed with error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

test();
