import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Users, Building, DollarSign, Zap, ChevronRight, Star, ChevronDown, ChevronUp, User, Briefcase, FileText, Brain } from 'lucide-react';

const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];
interface Lender {
    name: string;
    rating: number;
    description: string;
    interestRate: string;
    loanTerm: string;
    matchScore: number;
    propertyType: string; // Add property type for filtering
  }
interface FormData {
    propertyType: string;
    otherPropertyType: string;
    loanAmount: string;
    loanTerm: string;
    mortgageBalance: string;
    estimatedValue: string;
    occupancyRate: string;
    netOperatingIncome: string;
    yearBuilt: string;
    creditScore: string;
    experienceYears: string;
    entityType: string;
    dscr: string;
    ltv: string;
    cashReserves: string;
    propertyLocation: string;
    propertyState: string; // Add this new field
    totalSquareFootage: string;
    numberOfUnits: string;
    recentRenovations: string;
    loanPurpose: string;
    preferredRateType: string;
    environmentalIssues: string;
    existingTenants: string;
    pendingLegalIssues: string;
    preferredLenderType: string;
    personalGuarantee: string;
    propertyStreetAddress: string;
    propertyCity: string;
    propertyZipCode: string;
    propertyAddressStreet: string;
    propertyAddressCity: string;
    propertyAddressState: string;
    propertyAddressZipCode: string;
}

const LenderCard: React.FC<{ lender: Lender }> = ({ lender }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{lender.name}</h3>
      <div className="flex items-center">
        <Star className="text-yellow-400 fill-current" size={20} />
        <span className="ml-1 text-gray-600">{lender.rating}</span>
      </div>
    </div>
    <p className="text-gray-600 mb-4">{lender.description}</p>
    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
      <span>Interest Rate: {lender.interestRate}</span>
      <span>Loan Term: {lender.loanTerm}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-green-600 font-semibold">Match Score: {lender.matchScore}%</span>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors duration-300 flex items-center">
        View Details <ChevronRight size={20} className="ml-2" />
      </button>
    </div>
  </div>
);
// Define the props interface
interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType; // Optional icon prop
  isLast?: boolean; // Optional prop to identify the last section
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children, icon: Icon, isLast = false }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control open/close

  return (
    <div
      className={`${
        isLast
          ? "mt-6 w-full bg-orange-500 text-white py-1 rounded-md text-lg font-semibold "
          : "mb-6 border border-orange-500 rounded-md text-center"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)} // Toggle open/close state on click
        className={`flex items-center ${
          isLast ? "justify-center" : "justify-between"
        } w-full px-4 py-2 ${
          isLast ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"
        } font-medium rounded-md transition-colors duration-300`}
      >
        <span className="flex items-center">
          {Icon && <Icon size={20} className={`mr-2 ${isLast ? "text-white" : "text-orange-500"}`} />}
          {title} {/* Title passed as a prop */}
        </span>
        {!isLast && (
          isOpen ? (
            <ChevronUp size={20} className={`${isLast ? "text-white" : "text-orange-500"}`} />
          ) : (
            <ChevronDown size={20} className={`${isLast ? "text-white" : "text-orange-500"}`} />
          )
        )}
      </button>
      {isOpen && <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>}
    </div>
  );
};




const IntelligentLenderMatchingComponent: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(() => ({
        propertyType: '',
        otherPropertyType: '',
        loanAmount: '',
        loanTerm: '',
        mortgageBalance: '',
        estimatedValue: '',
        occupancyRate: '',
        netOperatingIncome: '',
        yearBuilt: '',
        creditScore: '',
        experienceYears: '',
        entityType: '',
        dscr: '',
        ltv: '',
        cashReserves: '',
        propertyLocation: '',
        propertyState: '', // Add this new field
        totalSquareFootage: '',
        numberOfUnits: '',
        recentRenovations: '',
        loanPurpose: '',
        preferredRateType: '',
        environmentalIssues: '',
        existingTenants: '',
        pendingLegalIssues: '',
        preferredLenderType: '',
        personalGuarantee: '',
        propertyAddressStreet: '',
        propertyAddressCity: '',
        propertyAddressState: '',
        propertyAddressZipCode: '',
        propertyStreetAddress: '',
        propertyCity: '',
        propertyZipCode: ''
    }));

    const [matchedLenders, setMatchedLenders] = useState<Lender[]>([]);
    const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API call to AI matching service
    setTimeout(() => {
      const allLenders = [
        {
            name: "PrimeLend Capital",
            rating: 4.8,
            description: "Specializing in commercial real estate loans with competitive rates.",
            interestRate: "3.75% - 4.25%",
            loanTerm: "5-25 years",
            matchScore: 95,
            propertyType: "office" // Example property type
        },
        {
            name: "Retail Lenders Inc.",
            rating: 4.5,
            description: "Focused on retail properties with flexible terms.",
            interestRate: "4.00% - 4.50%",
            loanTerm: "10-30 years",
            matchScore: 90,
            propertyType: "retail" // Example property type
        },
        {
            name: "MetroBank CRE",
            rating: 4.7,
            description: "Large-scale commercial real estate financing solutions.",
            interestRate: "3.85% - 4.35%",
            loanTerm: "7-20 years",
            matchScore: 82,
            propertyType: "industrial" // Example property type
        },
        {
            name: "Velocity Commercial Capital",
            rating: 4.5,
            description: "Specializing in small to medium-sized commercial properties.",
            interestRate: "4.25% - 5.00%",
            loanTerm: "3-10 years",
            matchScore: 79,
            propertyType: "multifamily" // Example property type
        },
        {
            name: "Liberty SBF",
            rating: 4.4,
            description: "Focused on SBA 504 loans for owner-occupied commercial real estate.",
            interestRate: "3.50% - 4.00%",
            loanTerm: "10-25 years",
            matchScore: 76,
            propertyType: "hotel" // Example property type
        },
        {
            name: "J.P. Morgan Chase",
            rating: 4.3,
            description: "Tech-driven platform offering various commercial real estate loan products.",
            interestRate: "4.50% - 5.25%",
            loanTerm: "3-10 years",
            matchScore: 73,
            propertyType: "medical" // Example property type
        },
        {
            name: "Cambridge Wilkinson",
            rating: 4.6,
            description: "Tailored financing solutions for complex commercial real estate projects.",
            interestRate: "4.75% - 5.50%",
            loanTerm: "1-7 years",
            matchScore: 70,
            propertyType: "self-storage" // Example property type
        },
        {
            name: "Silver Hill Funding",
            rating: 4.2,
            description: "Small-balance commercial mortgages with streamlined processes.",
            interestRate: "5.00% - 6.00%",
            loanTerm: "5-30 years",
            matchScore: 68,
            propertyType: "mixed-use" // Example property type
        },
        {
            name: "Greystone",
            rating: 4.7,
            description: "Comprehensive commercial real estate finance company with diverse loan products.",
            interestRate: "3.90% - 4.60%",
            loanTerm: "5-35 years",
            matchScore: 65,
            propertyType: "warehouse" // Example property type
        },
        {
            name: "Bank of America",
            rating: 4.4,
            description: "Nationwide commercial real estate lender with a variety of loan options.",
            interestRate: "4.25% - 5.25%",
            loanTerm: "5-30 years",
            matchScore: 62,
            propertyType: "flex" // Example property type
        },
        {
            name: "Arbor Realty Trust",
            rating: 4.5,
            description: "Specializing in multifamily and commercial real estate financing.",
            interestRate: "4.00% - 4.75%",
            loanTerm: "5-10 years",
            matchScore: 60,
            propertyType: "parking" // Example property type
        },
        {
            name: "CoreVest Finance",
            rating: 4.3,
            description: "Focused on residential real estate investors and build-to-rent properties.",
            interestRate: "4.75% - 5.75%",
            loanTerm: "5-30 years",
            matchScore: 58,
            propertyType: "restaurant" // Example property type
        },
        {
            name: "Lendistry",
            rating: 4.1,
            description: "Community-focused lender supporting small businesses and commercial real estate.",
            interestRate: "5.50% - 7.00%",
            loanTerm: "10-25 years",
            matchScore: 55,
            propertyType: "gas-station" // Example property type
        },
        {
            name: "Alliant Credit Union",
            rating: 4.6,
            description: "Credit union offering competitive commercial real estate loans.",
            interestRate: "3.80% - 4.40%",
            loanTerm: "5-15 years",
            matchScore: 53,
            propertyType: "data-center" // Example property type
        },
        {
            name: "Broadmark Realty Capital",
            rating: 4.2,
            description: "Specializing in short-term, construction, and renovation loans.",
            interestRate: "7.00% - 10.00%",
            loanTerm: "1-5 years",
            matchScore: 50,
            propertyType: "other" // Example property type
        }
      ];

      // Filter lenders based on selected property type
      const filteredLenders = allLenders.filter(lender => 
        lender.propertyType === formData.propertyType
      );

      setMatchedLenders(filteredLenders);
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-orange-500 text-center mb-8">
          Intelligent Lender Matching
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Provide detailed information for the most accurate lender matches.
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-12">
          <ExpandableSection title="Property Information" icon={Building}>
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select Commercial Type</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="industrial">Industrial</option>
                <option value="multifamily">Multifamily</option>
                <option value="hotel">Hotel/Motel</option>
                <option value="medical">Medical/Healthcare</option>
                <option value="self-storage">Self-Storage</option>
                <option value="mixed-use">Mixed-Use</option>
                <option value="warehouse">Warehouse</option>
                <option value="flex">Flex Space</option>
                <option value="parking">Parking Garage/Lot</option>
                <option value="restaurant">Restaurant</option>
                <option value="gas-station">Gas Station</option>
                <option value="data-center">Data Center</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="propertyStreetAddress" className="block text-sm font-medium text-gray-700 mb-2">Property Street Address</label>
              <input
                type="text"
                id="propertyStreetAddress"
                name="propertyStreetAddress"
                value={formData.propertyStreetAddress}
                onChange={handleInputChange}
                placeholder="e.g. 123 Main St"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="propertyCity" className="block text-sm font-medium text-gray-700 mb-2">Property City</label>
              <input
                type="text"
                id="propertyCity"
                name="propertyCity"
                value={formData.propertyCity}
                onChange={handleInputChange}
                placeholder="e.g. Los Angeles"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="propertyState" className="block text-sm font-medium text-gray-700 mb-2">Property State</label>
              <select
                id="propertyState"
                name="propertyState"
                value={formData.propertyState}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select State</option>
                {usStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="propertyZipCode" className="block text-sm font-medium text-gray-700 mb-2">Property Zip Code</label>
              <input
                type="text"
                id="propertyZipCode"
                name="propertyZipCode"
                value={formData.propertyZipCode}
                onChange={handleInputChange}
                placeholder="e.g. 90001"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="totalSquareFootage" className="block text-sm font-medium text-gray-700 mb-2">Total Square Footage</label>
              <input
                type="text"
                id="totalSquareFootage"
                name="totalSquareFootage"
                value={formData.totalSquareFootage}
                onChange={handleInputChange}
                placeholder="e.g. 50000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="numberOfUnits" className="block text-sm font-medium text-gray-700 mb-2">Number of Units</label>
              <input
                type="text"
                id="numberOfUnits"
                name="numberOfUnits"
                value={formData.numberOfUnits}
                onChange={handleInputChange}
                placeholder="For multi-unit properties"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="occupancyRate" className="block text-sm font-medium text-gray-700 mb-2">Occupancy Rate</label>
              <input
                type="text"
                id="occupancyRate"
                name="occupancyRate"
                value={formData.occupancyRate}
                onChange={handleInputChange}
                placeholder="e.g. 95%"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-2">Year Built</label>
              <input
                type="text"
                id="yearBuilt"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleInputChange}
                placeholder="e.g. 1995"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </ExpandableSection>

          <ExpandableSection title="Loan Details" icon={DollarSign}>
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
              <input
                type="text"
                id="loanAmount"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleInputChange}
                placeholder="e.g. $5,000,000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-2">Desired Loan Term</label>
              <select
                id="loanTerm"
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">Select Term</option>
                <option value="5">5 years</option>
                <option value="10">10 years</option>
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="25">25 years</option>
                <option value="30">30 years</option>
              </select>
            </div>
            <div>
              <label htmlFor="estimatedValue" className="block text-sm font-medium text-gray-700 mb-2">Estimated Property Value</label>
              <input
                type="text"
                id="estimatedValue"
                name="estimatedValue"
                value={formData.estimatedValue}
                onChange={handleInputChange}
                placeholder="e.g. $7,500,000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="loanPurpose" className="block text-sm font-medium text-gray-700 mb-2">Loan Purpose</label>
              <select
                id="loanPurpose"
                name="loanPurpose"
                value={formData.loanPurpose}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Purpose</option>
                <option value="purchase">Purchase</option>
                <option value="refinance">Refinance</option>
                <option value="cash-out">Cash-Out Refinance</option>
                <option value="construction">Construction</option>
              </select>
            </div>
            <div>
              <label htmlFor="preferredRateType" className="block text-sm font-medium text-gray-700 mb-2">Preferred Rate Type</label>
              <select
                id="preferredRateType"
                name="preferredRateType"
                value={formData.preferredRateType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Rate Type</option>
                <option value="fixed">Fixed</option>
                <option value="variable">Variable</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Financial Information" icon={Briefcase}>
            <div>
              <label htmlFor="mortgageBalance" className="block text-sm font-medium text-gray-700 mb-2">Current Mortgage Balance</label>
              <input
                type="text"
                id="mortgageBalance"
                name="mortgageBalance"
                value={formData.mortgageBalance}
                onChange={handleInputChange}
                placeholder="e.g. $3,000,000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="netOperatingIncome" className="block text-sm font-medium text-gray-700 mb-2">Net Operating Income (Annual)</label>
              <input
                type="text"
                id="netOperatingIncome"
                name="netOperatingIncome"
                value={formData.netOperatingIncome}
                onChange={handleInputChange}
                placeholder="e.g. $500,000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="dscr" className="block text-sm font-medium text-gray-700 mb-2">Debt Service Coverage Ratio (DSCR)</label>
              <input
                type="text"
                id="dscr"
                name="dscr"
                value={formData.dscr}
                onChange={handleInputChange}
                placeholder="e.g. 1.25"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="ltv" className="block text-sm font-medium text-gray-700 mb-2">Loan-to-Value Ratio (LTV)</label>
              <input
                type="text"
                id="ltv"
                name="ltv"
                value={formData.ltv}
                onChange={handleInputChange}
                placeholder="e.g. 75%"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="cashReserves" className="block text-sm font-medium text-gray-700 mb-2">Cash Reserves</label>
              <input
                type="text"
                id="cashReserves"
                name="cashReserves"
                value={formData.cashReserves}
                onChange={handleInputChange}
                placeholder="e.g. $1,000,000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </ExpandableSection>

          <ExpandableSection title="Borrower Information" icon={User}>
            <div>
              <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700 mb-2">Credit Score</label>
              <input
                type="text"
                id="creditScore"
                name="creditScore"
                value={formData.creditScore}
                onChange={handleInputChange}
                placeholder="e.g. 750"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-2">Years of Real Estate Experience</label>
              <input
                type="text"
                id="experienceYears"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                placeholder="e.g. 10"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label htmlFor="entityType" className="block text-sm font-medium text-gray-700 mb-2">Entity Type</label>
              <select
                id="entityType"
                name="entityType"
                value={formData.entityType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Entity Type</option>
                <option value="individual">Individual</option>
                <option value="llc">LLC</option>
                <option value="corporation">Corporation</option>
                <option value="partnership">Partnership</option>
                <option value="trust">Trust</option>
              </select>
            </div>
            <div>
              <label htmlFor="personalGuarantee" className="block text-sm font-medium text-gray-700 mb-2">Willing to Provide Personal Guarantee</label>
              <select
                id="personalGuarantee"
                name="personalGuarantee"
                value={formData.personalGuarantee}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Additional Factors" icon={FileText}>
            <div>
              <label htmlFor="environmentalIssues" className="block text-sm font-medium text-gray-700 mb-2">Environmental Issues</label>
              <textarea
                id="environmentalIssues"
                name="environmentalIssues"
                value={formData.environmentalIssues}
                onChange={handleInputChange}
                placeholder="Describe any known environmental issues"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label htmlFor="existingTenants" className="block text-sm font-medium text-gray-700 mb-2">Existing Tenants</label>
              <textarea
                id="existingTenants"
                name="existingTenants"
                value={formData.existingTenants}
                onChange={handleInputChange}
                placeholder="Describe major tenants and lease terms"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label htmlFor="pendingLegalIssues" className="block text-sm font-medium text-gray-700 mb-2">Pending Legal Issues</label>
              <textarea
                id="pendingLegalIssues"
                name="pendingLegalIssues"
                value={formData.pendingLegalIssues}
                onChange={handleInputChange}
                placeholder="Describe any pending legal issues"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label htmlFor="preferredLenderType" className="block text-sm font-medium text-gray-700 mb-2">Preferred Lender Type</label>
              <select
                id="preferredLenderType"
                name="preferredLenderType"
                value={formData.preferredLenderType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Preferred Lender Type</option>
                <option value="bank">Bank</option>
                <option value="credit-union">Credit Union</option>
                <option value="private-lender">Private Lender</option>
                <option value="government-backed">Government-Backed</option>
                <option value="commercial-bank">Commercial Bank</option>
                <option value="investment-bank">Investment Bank</option>
                <option value="insurance-company">Insurance Company</option>
                <option value="asset-based-lender">Asset Based Lender</option>
                <option value="bridge-lender">Bride Lender</option>
                <option value="Hard-Money-Lender">Hard Money Lender</option>
                <option value="sba-lender">SBA Lender</option>
                <option value="any">Any</option>
              </select>
            </div>
          </ExpandableSection>

          <ExpandableSection title="Cregenius AI" isLast icon={Brain}>
            <div >
              <label htmlFor="environmentalIssues" className="block text-sm font-medium text-gray-700 mb-2 text-center">Cregenius</label>
              <textarea
                id="environmentalIssues"
                name="environmentalIssues"
                value={formData.environmentalIssues}
                onChange={handleInputChange}
                placeholder="Describe any known environmental issues"
                className="w-full"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label htmlFor="existingTenants" className="block text-sm font-medium text-gray-700 mb-2">Cregenius</label>
              <textarea
                id="existingTenants"
                name="existingTenants"
                value={formData.existingTenants}
                onChange={handleInputChange}
                placeholder="Describe major tenants and lease terms"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label htmlFor="pendingLegalIssues" className="block text-sm font-medium text-gray-700 mb-2">Cregenius</label>
              <textarea
                id="pendingLegalIssues"
                name="pendingLegalIssues"
                value={formData.pendingLegalIssues}
                onChange={handleInputChange}
                placeholder="Describe any pending legal issues"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500"
                rows={3}
              ></textarea>
            </div>
            <div>
              <label htmlFor="preferredLenderType" className="block text-sm font-medium text-gray-700 mb-2">Cregenius</label>
              <select
                id="preferredLenderType"
                name="preferredLenderType"
                value={formData.preferredLenderType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Cregenius</option>
                <option value="bank">Bank</option>
                <option value="credit-union">Credit Union</option>
                <option value="private-lender">Private Lender</option>
                <option value="government-backed">Government-Backed</option>
                <option value="any">Any</option>
              </select>
            </div>
          </ExpandableSection>

          <button
            type="submit"
            className="mt-6 w-full bg-orange-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Zap className="animate-spin mr-2" size={24} />
                AI Matching in Progress...
              </>
            ) : (
              <>
                <Zap className="mr-2" size={24} />
                Find Matching Lenders
              </>
            )}
          </button>
        </form>

        {matchedLenders.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Top Matched Lenders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedLenders.map((lender, index) => (
                <LenderCard key={index} lender={lender} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Zap className="text-orange-500 mr-2" size={24} />
            How Our AI Matching Works
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Building className="text-orange-500 mr-2 flex-shrink-0" size={20} />
              <span>Analyzes your property details and financial requirements</span>
            </li>
            <li className="flex items-start">
              <Users className="text-orange-500 mr-2 flex-shrink-0" size={20} />
              <span>Compares your profile with thousands of lender criteria</span>
            </li>
            <li className="flex items-start">
              <DollarSign className="text-orange-500 mr-2 flex-shrink-0" size={20} />
              <p>Identifies lenders offering the most competitive terms</p>
            </li>
            <li className="flex items-start">
              <Star className="text-orange-500 mr-2 flex-shrink-0" size={20} />
              <p>Ranks matches based on likelihood of approval and term favorability</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IntelligentLenderMatchingComponent;
