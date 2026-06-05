import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Customer from './models/Customer.js';
import { CUSTOMER_STATUS } from './constants/customerStatus.js';

dotenv.config();

const customers = [
  {
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@techcorp.com',
    phone: '+1 (555) 234-5678',
    company: 'TechCorp Solutions',
    address: '123 Innovation Drive, San Francisco, CA 94105',
    status: CUSTOMER_STATUS.ACTIVE,
    notes: 'Key enterprise account. Quarterly review scheduled.',
  },
  {
    name: 'James Rodriguez',
    email: 'j.rodriguez@globalfinance.io',
    phone: '+1 (555) 345-6789',
    company: 'Global Finance Inc',
    address: '456 Wall Street, New York, NY 10005',
    status: CUSTOMER_STATUS.ACTIVE,
    notes: 'Interested in premium support package.',
  },
  {
    name: 'Emily Chen',
    email: 'emily.chen@startuphub.co',
    phone: '+1 (555) 456-7890',
    company: 'StartupHub',
    address: '789 Venture Lane, Austin, TX 78701',
    status: CUSTOMER_STATUS.LEAD,
    notes: 'Met at SaaS conference. Follow up next week.',
  },
  {
    name: 'Michael Thompson',
    email: 'mthompson@retailmax.com',
    phone: '+1 (555) 567-8901',
    company: 'RetailMax',
    address: '321 Commerce Blvd, Chicago, IL 60601',
    status: CUSTOMER_STATUS.ACTIVE,
    notes: 'Expanding to 3 new locations.',
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.a@healthplus.org',
    phone: '+1 (555) 678-9012',
    company: 'HealthPlus Medical',
    address: '654 Wellness Ave, Boston, MA 02108',
    status: CUSTOMER_STATUS.LEAD,
    notes: 'Evaluating CRM solutions for patient management.',
  },
  {
    name: 'David Park',
    email: 'dpark@buildright.net',
    phone: '+1 (555) 789-0123',
    company: 'BuildRight Construction',
    address: '987 Builder Way, Denver, CO 80202',
    status: CUSTOMER_STATUS.INACTIVE,
    notes: 'Contract ended. Potential re-engagement Q3.',
  },
  {
    name: 'Jennifer Walsh',
    email: 'jwalsh@creativestudio.design',
    phone: '+1 (555) 890-1234',
    company: 'Creative Studio Design',
    address: '147 Art District, Portland, OR 97201',
    status: CUSTOMER_STATUS.ACTIVE,
    notes: 'Monthly retainer client.',
  },
  {
    name: 'Robert Kim',
    email: 'rkim@logisticspro.com',
    phone: '+1 (555) 901-2345',
    company: 'Logistics Pro',
    address: '258 Freight Road, Atlanta, GA 30301',
    status: CUSTOMER_STATUS.LEAD,
    notes: 'Requested demo for fleet management integration.',
  },
  {
    name: 'Amanda Foster',
    email: 'afoster@edulearn.edu',
    phone: '+1 (555) 012-3456',
    company: 'EduLearn Academy',
    address: '369 Campus Drive, Seattle, WA 98101',
    status: CUSTOMER_STATUS.ACTIVE,
    notes: 'Education sector pilot program.',
  },
  {
    name: 'Christopher Lee',
    email: 'clee@greenenergy.co',
    phone: '+1 (555) 123-4567',
    company: 'Green Energy Co',
    address: '741 Solar Street, Phoenix, AZ 85001',
    status: CUSTOMER_STATUS.INACTIVE,
    notes: 'Budget constraints. Revisit in 6 months.',
  },
  {
    name: 'Nicole Martinez',
    email: 'nmartinez@foodchain.biz',
    phone: '+1 (555) 234-5670',
    company: 'FoodChain Distribution',
    address: '852 Supply Chain Rd, Miami, FL 33101',
    status: CUSTOMER_STATUS.ACTIVE,
    notes: 'Multi-location rollout in progress.',
  },
  {
    name: 'Daniel Wright',
    email: 'dwright@autoparts.com',
    phone: '+1 (555) 345-6780',
    company: 'AutoParts Direct',
    address: '963 Motor Ave, Detroit, MI 48201',
    status: CUSTOMER_STATUS.LEAD,
    notes: 'Inbound lead from website form.',
  },
  {
    name: 'Rachel Green',
    email: 'rgreen@luxuryhotels.group',
    phone: '+1 (555) 456-7891',
    company: 'Luxury Hotels Group',
    address: '174 Hospitality Blvd, Las Vegas, NV 89101',
    status: CUSTOMER_STATUS.ACTIVE,
    notes: 'VIP hospitality package subscriber.',
  },
  {
    name: 'Kevin Brown',
    email: 'kbrown@insuretech.io',
    phone: '+1 (555) 567-8902',
    company: 'InsureTech Solutions',
    address: '285 Policy Lane, Hartford, CT 06101',
    status: CUSTOMER_STATUS.INACTIVE,
    notes: 'Switched to competitor. Monitor for win-back.',
  },
  {
    name: 'Stephanie Davis',
    email: 'sdavis@mediagroup.tv',
    phone: '+1 (555) 678-9013',
    company: 'Media Group TV',
    address: '396 Broadcast Way, Los Angeles, CA 90001',
    status: CUSTOMER_STATUS.LEAD,
    notes: 'Content management integration inquiry.',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Customer.deleteMany({});
    await User.deleteMany({ email: 'admin@crm.com' });

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@crm.com',
      password: 'admin123',
    });

    const customerRecords = customers.map((customer) => ({
      ...customer,
      createdBy: admin._id,
    }));

    await Customer.insertMany(customerRecords);

    console.log('Database seeded successfully');
    console.log('Test user: admin@crm.com / admin123');
    console.log(`Created ${customerRecords.length} customers`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
