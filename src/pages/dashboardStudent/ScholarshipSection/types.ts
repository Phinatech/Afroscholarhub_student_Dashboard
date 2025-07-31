// types.ts
export type ScholarshipType = {
    id: string;
    title: string;
    description: string;
    image: string;
    application_fee: number;
    application_link: string;
    country: string;
    course: string;
    scholarship_keywords: string[];
    creator: string;
    // Add any other properties that your scholarship object has
  };
  
  export type OneScholarProps = {
    scholarship: ScholarshipType;
    scholarId: string;
  };