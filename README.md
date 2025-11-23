# 🌲 ForestGuard: Protecting Kenya's Forests with Technology

**Built by:** Allan Mbuthia | **For:** WMF Hackathon 2025 | **Track:** Forest Monitoring

---

## 🔐 Demo Login Credentials

### Admin Account
**Email:** `admin@forestguard.app`  
**Password:** `ForestGuard2025!`

*Access the admin dashboard at `/admin-auth` to manage rangers, review reports, and track forest health.*

### Ranger Account
**Email:** `ranger@forestguard.app`  
**Password:** `RangerField2025!`

*Access the ranger interface at `/auth` then navigate to `/ranger` for mobile field tools.*

---

## The Problem We're Solving

Kenya loses 12,000 hectares of forest every year to illegal logging, land grabbing, and fires. Traditional monitoring depends on infrequent patrols that arrive too late. Whistleblowers who report illegal activity face threats, corruption, and retaliation.

**Result:** Forests disappear while communities watch helplessly.

---

## How ForestGuard Works

We're building a 4-layer protection system:

1. **🛰️ Satellites Watch from Space** *(Coming Soon)* - Sentinel-2 satellite integration planned for Phase 2. Currently displays forest boundaries and supports custom satellite image uploads.
2. **📡 Smart Sensors Listen on the Ground** *(Demo Mode)* - IoT sensor simulation framework ready. Physical deployment planned for pilot phase with 50 sensors in Karura Forest.
3. **🔗 Communities Report Anonymously** *(Live)* - Blockchain-protected anonymous reporting system working now. Reports stored with cryptographic verification.
4. **🤖 AI Alerts Rangers Instantly** *(Live)* - Real-time alert dashboard, ranger mobile app, and AI-powered forest health summaries operational.

**The Result:** A working platform ready for pilot deployment with clear path to full satellite + IoT integration.

---

## What Makes Us Different

🎯 **Ready to Deploy Today:** Not just a prototype. This is a working PWA that rangers can install on their phones right now.

🔒 **True Anonymous Reporting:** Other projects say "anonymous" but store your data. We use blockchain so even admins can't trace whistleblowers.

📱 **Built for Kenya's Reality:** Offline-first design for areas with poor connectivity. Mobile-first for rangers in the field.

💰 **Financially Sustainable:** Clear business model with government subscriptions, carbon credit verification fees, and data licensing.

---

## What's Live Right Now

✅ **Complete Platform MVP** - Admin dashboard, ranger mobile app, stakeholder portal all functional  
✅ **Anonymous Reporting System** - Blockchain-backed reporting with cryptographic verification working  
✅ **Forest Management Tools** - Task assignment, field reports, real-time notifications operational  
✅ **AI Summaries** - Automated forest health summaries and voice briefings functional  
✅ **Multi-Forest Support** - 10 Kenyan forests integrated with boundary data  
✅ **PWA Ready** - Installable mobile app with offline support for rangers

**📍 Current Status:** Ready for pilot deployment. Awaiting partnerships for satellite API access and physical IoT sensor funding.

---

## Technology Stack

**Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion, Mapbox GL  
**Backend:** Supabase (PostgreSQL), Edge Functions, Realtime subscriptions  
**Monitoring:** IoT simulation framework, Satellite imagery integration  
**Security:** Blockchain (Polygon), WebAuthn biometric auth, IPFS, Zero-Knowledge Proofs  
**AI:** Lovable AI Gateway (Gemini 2.5 Flash) for automated summaries and alerts

---

## Business Model & Sustainability

### Revenue Streams (5-Year Projection)

**Year 1-2: Grant Funded Phase**
- Target: Kenya Forest Service, GEF, World Bank grants
- Focus on proof of concept and pilot deployment
- Operating cost: $3,100/year

**Year 3: Pilot Partnerships**
- **B2G Subscriptions:** KFS monitoring - $50,000/year per county → 10 counties = **$500,000**
- **NGO Subscriptions:** Conservation orgs pay for transparency dashboard → 20 NGOs × $5,000 = **$100,000**
- **Data Licensing:** Forest health data for research institutions → **$50,000**
- **Total Year 3 Revenue: $650,000**

**Year 4-5: Scale & Sustainability**
- **Regional Expansion:** Uganda, Tanzania, Ethiopia forest services → **$2M annual revenue**
- **Data-as-a-Service:** Sell anonymized forest health data to researchers → **$200,000/year**
- **Enterprise SaaS Model:** White-label platform licensing → **$500,000/year**

### ROI Calculation
- **Investment needed:** $150,000 (Year 1-2 development + pilot deployment)
- **Break-even:** Year 3 (Month 2)
- **5-Year Revenue:** $6.5M
- **Investor Return:** 43x in 5 years
- **Profit Margin:** 85-90% after break-even

### Cost Structure (Transparent & Sustainable)
- IoT Hardware: $50/sensor × 300 sensors = $15,000 (one-time)
- Cloud Infrastructure: $500/month = $6,000/year
- Satellite API: $200/month = $2,400/year
- Ranger Support: $10,000/year (training, equipment)
- Platform Development: $30,000/year (maintenance, improvements)
- **Total Annual Operating Cost:** $48,400/year

### Impact Metrics (Social Return)
For every $1 invested:
- **$45 in prevented illegal logging losses** (Kenya loses $1.2B annually to illegal logging)
- **500 hectares of forest protected** (at scale)
- **5 communities empowered** through anonymous reporting
- **15 jobs created** (rangers, technicians, analysts)

---

## Architecture Overview

### Layer 1: Satellite Intelligence 🛰️ *(Phase 2 - Planned)*
**Current:** Forest boundary visualization, custom satellite image upload support  
**Coming Soon:** 
- Google Earth Engine API integration for live Sentinel-2 data
- NDVI vegetation health scoring (0-100 scale)
- Automated change detection and canopy loss alerts
- Before/after timeline comparison

### Layer 2: IoT Ground Sensors 📡 *(Demo Mode)*
**Current:** IoT simulation framework with realistic sensor data generation  
**Pilot Deployment (Q2 2025):**
- 50 LoRaWAN acoustic sensors in Karura Forest
- Chainsaw/vehicle sound detection AI
- Temperature/humidity monitoring for fire risk
- Solar-powered, 3+ year battery life

### Layer 3: Blockchain Anonymous Reporting 🔗 *(Live)*
**Current:** Anonymous reporting with blockchain transaction verification working  
**Architecture:**
- Zero-Knowledge Proofs for identity protection
- Polygon blockchain for immutable audit trail
- IPFS/Filecoin for decentralized storage (production)
- EXIF metadata stripping from photos
- Demo mode uses real Polygon transaction hashes for verification

### Layer 4: AI Real-Time Alerts 🤖 *(Live)*
**Current:** 
- Lovable AI integration (Gemini 2.5 Flash) for automated summaries
- Real-time notification system using Supabase Realtime
- Daily AI voice briefings for forest health updates
- Automated monthly forest story reports
**Coming Soon:** SMS alerts via Africa's Talking API (requires funding)

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Mbuthia71/forestguard.git
cd forestguard

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
# Register at /admin-auth (first user = master admin)
```

### Environment Setup
The project uses Lovable Cloud (Supabase) - no external setup required. All environment variables are pre-configured.

---

## System Roles

### Admin
- Full monitoring dashboard with satellite layers
- Ranger management and task assignment
- Alert review and verification
- Blockchain transaction tracking
- AI-generated forest health summaries

### Ranger
- Mobile-first field interface (works offline)
- Photo uploads with GPS tagging
- Task viewing and completion
- Field report submission
- Activity timeline

### Stakeholder
- Read-only transparency dashboard
- Forest health visualization
- Incident explorer with timeline
- Monthly forest story reports
- Public leaderboard

---

## Security & Privacy

### Anonymous Reporting Architecture
ForestGuard uses advanced cryptographic techniques to guarantee reporter anonymity:

- **No personal data storage:** System never collects names, emails, or credentials from reporters
- **Zero-knowledge verification:** Prove evidence validity without revealing identity
- **Blockchain immutability:** Reports cannot be deleted or altered by anyone
- **EXIF stripping:** All photo metadata removed before storage
- **Network obfuscation:** Tor/mixnet integration hides IP addresses
- **Time-locked encryption:** Prevents timing correlation attacks

**Security Guarantee:** Even if government seizes the entire database, reporter identities remain cryptographically protected.

---

## Deployment & Scaling

### Production Deployment
- **Frontend:** Vercel/Netlify (automatic CI/CD)
- **Backend:** Supabase Cloud (managed PostgreSQL + Edge Functions)
- **Blockchain:** Polygon mainnet (low gas fees, fast confirmations)
- **Storage:** Supabase Storage + IPFS/Filecoin

### Scalability
- Database scales to millions of records
- Edge functions auto-scale with traffic
- LoRaWAN supports 1000+ sensors per gateway
- Polygon handles 65,000 transactions/second

---

## Roadmap

### Phase 1: Current MVP (Completed ✅)
- ✅ Complete platform architecture with admin, ranger, and stakeholder portals
- ✅ Anonymous reporting system with blockchain verification
- ✅ AI-powered forest health summaries and voice briefings
- ✅ Real-time notifications and alert system
- ✅ Offline-first PWA for rangers
- ✅ Multi-forest support (10 Kenyan forests integrated)
- ✅ Task assignment and field report management
- ✅ Community features: research portal, educational resources

### Phase 2: Production Pilot (Q2 2025 - Needs Funding)
- 🎯 **Deploy 50 physical IoT sensors** in Karura Forest (Cost: $2,500)
- 🎯 **Integrate Google Earth Engine API** for live Sentinel-2 satellite data (API access required)
- 🎯 **Partner with Kenya Forest Service** for official pilot program
- 🎯 **Train 20 rangers** on system usage and field protocols
- 🎯 **SMS alert integration** via Africa's Talking (requires subscription)

### Phase 3: Scale & Expansion (Q3-Q4 2025)
- 🎯 Expand to 300+ IoT sensors across 10 forests
- 🎯 Integrate M-PESA for anonymous whistleblower rewards
- 🎯 Launch public Forest Health Leaderboard with gamification
- 🎯 Regional expansion (Uganda, Tanzania, Ethiopia)
- 🎯 Enterprise API and data licensing for researchers

---

## Why This Matters

This isn't just about technology. It's about giving communities the power to protect their forests without fear. It's about making corruption visible. It's about using innovation to solve real problems in Kenya.

**Every protected tree is a step toward the future Wangari Maathai envisioned.**

---

## 📊 Case Study: Kakamega Forest

We've prepared a detailed deployment case study for **Kakamega Forest** (44,000 hectares), Kenya's largest remaining indigenous rainforest:

- **35 IoT sensors + 3 LoRaWAN gateways** strategically deployed
- **Year 1 Investment:** KES 2.1M (~$16,150)
- **Annual Operating Cost:** KES 1.5M (~$11,540)
- **Cost per hectare:** KES 34/year (~$0.26/year)
- **Expected ROI:** 86:1 over 5 years

Full breakdown with sensor placement, data collection plan, and impact metrics available in the pitch deck at `/pitch-deck`.

---

## Contributing

We welcome contributions from developers, forest rangers, environmental scientists, and conservation organizations. Please read our contributing guidelines before submitting pull requests.

---

## License

MIT License - See LICENSE file for details

---

## Contact

**Allan Mbuthia**  
Multi-disciplinary Founder  
- Software Developer  
- Geospatial Engineering Student, Technical University of Kenya  
- Vice-Chair, Environmental Student Organization at TUK  
- System Architect & Designer
allan.mbuthia.nganga@gmail.com

🌐 [ForestGuard Demo](https://forestguard.lovable.app)

---

**Built with ❤️ in Kenya | Protecting forests, empowering communities**
