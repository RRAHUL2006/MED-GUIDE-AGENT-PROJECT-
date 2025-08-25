export type Language = "english" | "tamil" | "hindi"

export interface Translations {
  // Home Screen
  appName: string
  tagline: string
  checkSymptoms: string
  checkSymptomsDesc: string
  watchVideos: string
  watchVideosDesc: string
  callAgent: string
  callAgentDesc: string
  bookAppointment: string
  bookAppointmentDesc: string
  searchPlaceholder: string
  quickAccess: string
  emergencyHelp: string
  faqs: string
  privacyPolicy: string

  // Symptom Checker
  symptomChecker: string
  whatsTroubling: string
  describeSymptoms: string
  commonSymptoms: string
  selectedSymptoms: string
  getGuidance: string
  healthGuidance: string
  recommendedSpecialty: string
  yourSymptoms: string
  nearbySpecialists: string
  bookNow: string

  // Video Library
  healthVideos: string
  learnHealth: string
  allVideos: string
  videoPlayer: string
  share: string
  save: string
  transcript: string
  nextSteps: string
  checkYourSymptoms: string
  talkToAgent: string

  // Call Agent
  healthAgent: string
  talkToHealthAgent: string
  getInstantGuidance: string
  callNow: string
  recentConversations: string
  commonMedications: string
  medicationWarning: string
  moreOptions: string
  requestCallback: string
  callbackDesc: string
  emergencyContact: string
  emergencyDesc: string
  giveFeedback: string
  feedbackDesc: string
  shareFeedback: string
  feedbackPlaceholder: string
  submitFeedback: string
  cancel: string

  // Common
  back: string
  loading: string
  error: string
  success: string
  close: string
  open: string
  selectLanguage: string
}

export const translations: Record<Language, Translations> = {
  english: {
    // Home Screen
    appName: "MED-GUIDE",
    tagline: "Your Health, Your Language",
    checkSymptoms: "Check Symptoms",
    checkSymptomsDesc: "Get personalized health guidance",
    watchVideos: "Watch Health Videos",
    watchVideosDesc: "Learn from expert explanations",
    callAgent: "Call Health Agent",
    callAgentDesc: "Speak with our AI assistant",
    bookAppointment: "Book Appointment",
    bookAppointmentDesc: "Schedule with specialists",
    searchPlaceholder: "Search symptoms or doctor names...",
    quickAccess: "Quick Access",
    emergencyHelp: "Emergency Help",
    faqs: "FAQs",
    privacyPolicy: "Privacy Policy",

    // Symptom Checker
    symptomChecker: "Symptom Checker",
    whatsTroubling: "What's troubling you today?",
    describeSymptoms: "Describe your symptoms...",
    commonSymptoms: "Or select from common symptoms:",
    selectedSymptoms: "Selected symptoms:",
    getGuidance: "Get Guidance",
    healthGuidance: "Health Guidance",
    recommendedSpecialty: "Recommended Specialty",
    yourSymptoms: "Your Symptoms",
    nearbySpecialists: "Nearby Specialists",
    bookNow: "Book Now",

    // Video Library
    healthVideos: "Health Videos",
    learnHealth: "Learn About Your Health",
    allVideos: "All Videos",
    videoPlayer: "Video Player",
    share: "Share",
    save: "Save",
    transcript: "Transcript",
    nextSteps: "Next Steps",
    checkYourSymptoms: "Check Your Symptoms",
    talkToAgent: "Talk to Health Agent",

    // Call Agent
    healthAgent: "Health Agent",
    talkToHealthAgent: "Talk to Your Health Agent",
    getInstantGuidance: "Get instant health guidance and support",
    callNow: "Call Now",
    recentConversations: "Recent Conversations",
    commonMedications: "Common Medications",
    medicationWarning: "For minor ailments - Always consult a doctor first",
    moreOptions: "More Options",
    requestCallback: "Request Callback",
    callbackDesc: "We'll call you back within 15 minutes",
    emergencyContact: "Emergency Help",
    emergencyDesc: "Connect to emergency services",
    giveFeedback: "Give Feedback",
    feedbackDesc: "Help us improve our service",
    shareFeedback: "Share Your Feedback",
    feedbackPlaceholder: "Tell us about your experience with the health agent...",
    submitFeedback: "Submit Feedback",
    cancel: "Cancel",

    // Common
    back: "Back",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    close: "Close",
    open: "Open",
    selectLanguage: "Select Language",
  },

  tamil: {
    // Home Screen
    appName: "மெட்-கைட்",
    tagline: "உங்கள் ஆரோக்கியம், உங்கள் மொழி",
    checkSymptoms: "அறிகுறிகளைச் சரிபார்க்கவும்",
    checkSymptomsDesc: "தனிப்பட்ட சுகாதார வழிகாட்டுதலைப் பெறுங்கள்",
    watchVideos: "சுகாதார வீடியோக்களைப் பார்க்கவும்",
    watchVideosDesc: "நிபுணர் விளக்கங்களிலிருந்து கற்றுக்கொள்ளுங்கள்",
    callAgent: "சுகாதார முகவரை அழைக்கவும்",
    callAgentDesc: "எங்கள் AI உதவியாளருடன் பேசுங்கள்",
    bookAppointment: "மருத்துவ சந்திப்பை முன்பதிவு செய்யுங்கள்",
    bookAppointmentDesc: "நிபுணர்களுடன் நேரம் ஒதுக்குங்கள்",
    searchPlaceholder: "அறிகுறிகள் அல்லது மருத்துவர் பெயர்களைத் தேடுங்கள்...",
    quickAccess: "விரைவு அணுகல்",
    emergencyHelp: "அவசர உதவி",
    faqs: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    privacyPolicy: "தனியுரிமைக் கொள்கை",

    // Symptom Checker
    symptomChecker: "அறிகுறி சரிபார்ப்பான்",
    whatsTroubling: "இன்று உங்களை என்ன தொந்தரவு செய்கிறது?",
    describeSymptoms: "உங்கள் அறிகுறிகளை விவரிக்கவும்...",
    commonSymptoms: "அல்லது பொதுவான அறிகுறிகளிலிருந்து தேர்ந்தெடுக்கவும்:",
    selectedSymptoms: "தேர்ந்தெடுக்கப்பட்ட அறிகுறிகள்:",
    getGuidance: "வழிகாட்டுதலைப் பெறுங்கள்",
    healthGuidance: "சுகாதார வழிகாட்டுதல்",
    recommendedSpecialty: "பரிந்துரைக்கப்பட்ட சிறப்பு மருத்துவம்",
    yourSymptoms: "உங்கள் அறிகுறிகள்",
    nearbySpecialists: "அருகிலுள்ள நிபுணர்கள்",
    bookNow: "இப்போதே முன்பதிவு செய்யுங்கள்",

    // Video Library
    healthVideos: "சுகாதார வீடியோக்கள்",
    learnHealth: "உங்கள் ஆரோக்கியத்தைப் பற்றி அறிந்து கொள்ளுங்கள்",
    allVideos: "அனைத்து வீடியோக்கள்",
    videoPlayer: "வீடியோ பிளேயர்",
    share: "பகிருங்கள்",
    save: "சேமிக்கவும்",
    transcript: "வசன விவரம்",
    nextSteps: "அடுத்த படிகள்",
    checkYourSymptoms: "உங்கள் அறிகுறிகளைச் சரிபார்க்கவும்",
    talkToAgent: "சுகாதார முகவருடன் பேசுங்கள்",

    // Call Agent
    healthAgent: "சுகாதார முகவர்",
    talkToHealthAgent: "உங்கள் சுகாதார முகவருடன் பேசுங்கள்",
    getInstantGuidance: "உடனடி சுகாதார வழிகாட்டுதல் மற்றும் ஆதரவைப் பெறுங்கள்",
    callNow: "இப்போதே அழைக்கவும்",
    recentConversations: "சமீபத்திய உரையாடல்கள்",
    commonMedications: "பொதுவான மருந்துகள்",
    medicationWarning: "சிறிய நோய்களுக்கு - எப்போதும் முதலில் மருத்துவரை அணுகவும்",
    moreOptions: "மேலும் விருப்பங்கள்",
    requestCallback: "திரும்ப அழைப்பைக் கோருங்கள்",
    callbackDesc: "15 நிமிடங்களுக்குள் நாங்கள் உங்களைத் திரும்ப அழைப்போம்",
    emergencyContact: "அவசர உதவி",
    emergencyDesc: "அவசர சேவைகளுடன் இணைக்கவும்",
    giveFeedback: "கருத்து தெரிவிக்கவும்",
    feedbackDesc: "எங்கள் சேவையை மேம்படுத்த உதவுங்கள்",
    shareFeedback: "உங்கள் கருத்தைப் பகிருங்கள்",
    feedbackPlaceholder: "சுகாதார முகவருடனான உங்கள் அனுபவத்தைப் பற்றி எங்களிடம் கூறுங்கள்...",
    submitFeedback: "கருத்தைச் சமர்ப்பிக்கவும்",
    cancel: "ரத்து செய்யவும்",

    // Common
    back: "பின்னால்",
    loading: "ஏற்றுகிறது...",
    error: "பிழை",
    success: "வெற்றி",
    close: "மூடவும்",
    open: "திறக்கவும்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
  },

  hindi: {
    // Home Screen
    appName: "मेड-गाइड",
    tagline: "आपका स्वास्थ्य, आपकी भाषा",
    checkSymptoms: "लक्षण जांचें",
    checkSymptomsDesc: "व्यक्तिगत स्वास्थ्य मार्गदर्शन प्राप्त करें",
    watchVideos: "स्वास्थ्य वीडियो देखें",
    watchVideosDesc: "विशेषज्ञ स्पष्टीकरण से सीखें",
    callAgent: "स्वास्थ्य एजेंट को कॉल करें",
    callAgentDesc: "हमारे AI सहायक से बात करें",
    bookAppointment: "अपॉइंटमेंट बुक करें",
    bookAppointmentDesc: "विशेषज्ञों के साथ शेड्यूल करें",
    searchPlaceholder: "लक्षण या डॉक्टर के नाम खोजें...",
    quickAccess: "त्वरित पहुंच",
    emergencyHelp: "आपातकालीन सहायता",
    faqs: "अक्सर पूछे जाने वाले प्रश्न",
    privacyPolicy: "गोपनीयता नीति",

    // Symptom Checker
    symptomChecker: "लक्षण जांचकर्ता",
    whatsTroubling: "आज आपको क्या परेशान कर रहा है?",
    describeSymptoms: "अपने लक्षणों का वर्णन करें...",
    commonSymptoms: "या सामान्य लक्षणों में से चुनें:",
    selectedSymptoms: "चयनित लक्षण:",
    getGuidance: "मार्गदर्शन प्राप्त करें",
    healthGuidance: "स्वास्थ्य मार्गदर्शन",
    recommendedSpecialty: "अनुशंसित विशेषता",
    yourSymptoms: "आपके लक्षण",
    nearbySpecialists: "नजदीकी विशेषज्ञ",
    bookNow: "अभी बुक करें",

    // Video Library
    healthVideos: "स्वास्थ्य वीडियो",
    learnHealth: "अपने स्वास्थ्य के बारे में जानें",
    allVideos: "सभी वीडियो",
    videoPlayer: "वीडियो प्लेयर",
    share: "साझा करें",
    save: "सहेजें",
    transcript: "ट्रांसक्रिप्ट",
    nextSteps: "अगले कदम",
    checkYourSymptoms: "अपने लक्षणों की जांच करें",
    talkToAgent: "स्वास्थ्य एजेंट से बात करें",

    // Call Agent
    healthAgent: "स्वास्थ्य एजेंट",
    talkToHealthAgent: "अपने स्वास्थ्य एजेंट से बात करें",
    getInstantGuidance: "तत्काल स्वास्थ्य मार्गदर्शन और सहायता प्राप्त करें",
    callNow: "अभी कॉल करें",
    recentConversations: "हाल की बातचीत",
    commonMedications: "सामान्य दवाएं",
    medicationWarning: "मामूली बीमारियों के लिए - हमेशा पहले डॉक्टर से सलाह लें",
    moreOptions: "अधिक विकल्प",
    requestCallback: "कॉलबैक का अनुरोध करें",
    callbackDesc: "हम 15 मिनट के भीतर आपको वापस कॉल करेंगे",
    emergencyContact: "आपातकालीन सहायता",
    emergencyDesc: "आपातकालीन सेवाओं से जुड़ें",
    giveFeedback: "फीडबैक दें",
    feedbackDesc: "हमारी सेवा को बेहतर बनाने में मदद करें",
    shareFeedback: "अपना फीडबैक साझा करें",
    feedbackPlaceholder: "स्वास्थ्य एजेंट के साथ अपने अनुभव के बारे में बताएं...",
    submitFeedback: "फीडबैक सबमिट करें",
    cancel: "रद्द करें",

    // Common
    back: "वापस",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    close: "बंद करें",
    open: "खोलें",
    selectLanguage: "भाषा चुनें",
  },
}
