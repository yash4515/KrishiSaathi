const Product = require('../models/Product');
const Insurance = require('../models/Insurance');

const seedProducts = [
    { name: 'NPK 10-26-26', category: 'fertilizers', brand: 'IFFCO', price: 1350, unit: '50 kg bag', description: 'Balanced nutrition for all crops', rating: 4.5, inStock: true },
    { name: 'Urea (Neem Coated)', category: 'fertilizers', brand: 'Kribhco', price: 266, unit: '45 kg bag', description: 'Nitrogen-rich fertilizer', rating: 4.3, inStock: true },
    { name: 'DAP Fertilizer', category: 'fertilizers', brand: 'Coromandel', price: 1350, unit: '50 kg bag', description: 'Phosphorus-rich for root growth', rating: 4.6, inStock: true },
    { name: 'Vermicompost', category: 'fertilizers', brand: 'Organic India', price: 450, unit: '25 kg bag', description: '100% organic manure', rating: 4.8, inStock: true },
    { name: 'Hybrid Tomato Seeds', category: 'seeds', brand: 'Syngenta', price: 850, unit: '10g pack', description: 'High-yield hybrid variety', rating: 4.7, inStock: true },
    { name: 'BT Cotton Seeds', category: 'seeds', brand: 'Mahyco', price: 930, unit: '450g pack', description: 'Bollworm resistant variety', rating: 4.4, inStock: true },
    { name: 'Wheat HD-2967', category: 'seeds', brand: 'ICAR', price: 120, unit: '1 kg pack', description: 'High-yield, disease resistant', rating: 4.6, inStock: true },
    { name: 'Paddy Pusa 1121', category: 'seeds', brand: 'IARI', price: 180, unit: '1 kg pack', description: 'Premium basmati variety', rating: 4.8, inStock: true },
    { name: 'Hand Sprayer 16L', category: 'tools', brand: 'Neptune', price: 1200, unit: '1 piece', description: 'Manual pressure sprayer', rating: 4.2, inStock: true },
    { name: 'Drip Irrigation Kit', category: 'tools', brand: 'Jain Irrigation', price: 3500, unit: '1 set', description: 'For 1-acre coverage', rating: 4.5, inStock: true },
    { name: 'Soil Testing Kit', category: 'tools', brand: 'AgroLab', price: 2100, unit: '1 kit', description: 'Test pH, NPK levels', rating: 4.6, inStock: true },
    { name: 'Garden Pruning Shears', category: 'tools', brand: 'Falcon', price: 450, unit: '1 piece', description: 'Sharp carbon steel blades', rating: 4.3, inStock: true },
];

const seedInsurance = [
    { name: 'Pradhan Mantri Fasal Bima Yojana', premium: '₹500/acre', coverage: '₹50,000/acre', duration: 'Kharif/Rabi Season', crops: ['Wheat', 'Rice', 'Cotton'], features: ['Natural calamity cover', 'Pest & disease protection', 'Post-harvest loss cover'], popular: true },
    { name: 'Weather Based Crop Insurance', premium: '₹800/acre', coverage: '₹75,000/acre', duration: '6 months', crops: ['All Crops'], features: ['Rainfall deviation cover', 'Temperature extremes', 'Quick claim settlement'], popular: false },
    { name: 'Unified Package Insurance', premium: '₹1,200/acre', coverage: '₹1,00,000/acre', duration: '12 months', crops: ['Horticulture', 'Fruits', 'Vegetables'], features: ['Comprehensive crop cover', 'Equipment insurance', 'Personal accident cover', 'Dwelling protection'], popular: true },
];

const autoseed = async () => {
    try {
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            console.log('🌱 No products found in DB. Auto-seeding default products...');
            await Product.insertMany(seedProducts);
            console.log(`✅ ${seedProducts.length} products seeded`);
        }

        const insuranceCount = await Insurance.countDocuments();
        if (insuranceCount === 0) {
            console.log('🌱 No insurance plans found in DB. Auto-seeding default plans...');
            await Insurance.insertMany(seedInsurance);
            console.log(`✅ ${seedInsurance.length} insurance plans seeded`);
        }
    } catch (error) {
        console.error('❌ Auto-seeding failed:', error.message);
    }
};

module.exports = autoseed;
