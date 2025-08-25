"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Globe, Share, Bookmark, ChevronRight, Stethoscope, Phone, Play } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Medical3DScene } from "./medical-3d-scene"
import { Medical3DVisualizations } from "./medical-3d-visualizations"

interface HealthTopic {
  id: string
  title: string
  category: string
  language: string
  thumbnail: string
  description: string
  educationalContent: {
    en: string
    ta: string
    hi: string
  }
  views: string
}

const healthTopics: HealthTopic[] = [
  {
    id: "1",
    title: "Fever Management: Understanding Body Temperature",
    category: "Fever",
    language: "Multi-language",
    thumbnail: "/doctor-fever-management.png",
    description: "Interactive 3D visualization of fever and body temperature regulation mechanisms.",
    educationalContent: {
      en: "Fever is your body's natural defense mechanism against infections. Normal body temperature ranges from 97°F to 99°F (36.1°C to 37.2°C). A fever is generally considered when temperature exceeds 100.4°F (38°C). For adults, fever can be managed at home with adequate rest, increased fluid intake of 8-10 glasses per day, and over-the-counter medications like acetaminophen (500-1000mg every 6 hours) or ibuprofen (400-600mg every 6-8 hours). Use lukewarm sponge baths and dress in light clothing. However, seek immediate medical attention if fever exceeds 103°F (39.4°C), persists for more than 3 days, or is accompanied by severe symptoms like difficulty breathing, chest pain, severe headache, stiff neck, confusion, persistent vomiting, or signs of dehydration.",
      ta: "காய்ச்சல் என்பது தொற்றுநோய்களுக்கு எதிரான உங்கள் உடலின் இயற்கையான பாதுகாப்பு வழிமுறையாகும். சாதாரண உடல் வெப்பநிலை 97°F முதல் 99°F (36.1°C முதல் 37.2°C) வரை இருக்கும். வெப்பநிலை 100.4°F (38°C) ஐ மீறும்போது பொதுவாக காய்ச்சல் என்று கருதப்படுகிறது. பெரியவர்களுக்கு, காய்ச்சலை வீட்டிலேயே போதுமான ஓய்வு, தினமும் 8-10 கிளாஸ் தண்ணீர் அருந்துதல், மற்றும் அசிட்டமினோஃபென் (6 மணி நேரத்திற்கு ஒருமுறை 500-1000mg) அல்லது இப்யூபுரூஃபென் (6-8 மணி நேரத்திற்கு ஒருமுறை 400-600mg) போன்ற மருந்துகளுடன் நிர்வகிக்கலாம்.",
      hi: "बुखार संक्रमण के खिलाफ आपके शरीर का प्राकृतिक रक्षा तंत्र है। सामान्य शरीर का तापमान 97°F से 99°F (36.1°C से 37.2°C) तक होता है। जब तापमान 100.4°F (38°C) से अधिक हो जाता है तो आमतौर पर बुखार माना जाता है। वयस्कों के लिए, बुखार को घर पर पर्याप्त आराम, दिन में 8-10 गिलास तरल पदार्थ का सेवन, और एसिटामिनोफेन (हर 6 घंटे में 500-1000mg) या इबुप्रोफेन (हर 6-8 घंटे में 400-600mg) जैसी दवाओं से प्रबंधित किया जा सकता है।",
    },
    views: "45.2K",
  },
  {
    id: "2",
    title: "Brain and Nervous System: Understanding Pain Signals",
    category: "Pain",
    language: "Multi-language",
    thumbnail: "/headache-types-illustration.png",
    description: "3D brain model showing how pain signals travel through the nervous system.",
    educationalContent: {
      en: "Pain signals help protect your body from harm. The nervous system processes pain through specialized receptors called nociceptors. Tension headaches feel like a tight band around your head, often bilateral, and are caused by stress, poor posture, eye strain, or muscle tension. Migraines are more severe, often unilateral, throbbing pain lasting 4-72 hours. Practice stress management, gentle exercise, and consult healthcare providers for persistent pain.",
      ta: "வலி சமிக்ஞைகள் உங்கள் உடலை தீங்கிலிருந்து பாதுகாக்க உதவுகின்றன. நரம்பு மண்டலம் நோசிசெப்டர்கள் எனப்படும் சிறப்பு ரிசெப்டர்கள் மூலம் வலியை செயலாக்குகிறது. பதற்றம் தலைவலி உங்கள் தலையைச் சுற்றி இறுக்கமான பட்டையைப் போல உணரப்படுகிறது, பெரும்பாலும் இருபக்கமும், மன அழுத்தம், கண் சோர்வு அல்லது தசை பதற்றம் ஆகியவற்றால் ஏற்படுகிறது।",
      hi: "दर्द के संकेत आपके शरीर को नुकसान से बचाने में मदद करते हैं। तंत्रिका तंत्र नोसिसेप्टर्स नामक विशेष रिसेप्टर्स के माध्यम से दर्द को प्रसंस्करण करता है। तनाव सिरदर्द आपके सिर के चारों ओर एक तंग बैंड की तरह महसूस होता है, अक्सर द्विपक्षीय, और तनाव, खराब मुद्रा, आंखों के तनाव, या मांसपेशियों के तनाव के कारण होता है।",
    },
    views: "32.8K",
  },
  {
    id: "3",
    title: "Digestive System: 3D Journey Through Your Gut",
    category: "Digestion",
    language: "Multi-language",
    thumbnail: "/digestive-system-diagram.png",
    description: "Interactive 3D model of the digestive system showing how food is processed.",
    educationalContent: {
      en: "The digestive system processes 2-3 liters of food and liquid daily. Your gut contains trillions of beneficial bacteria that help break down food and support immune function. Maintain digestive health with 25-35g fiber daily, 8-10 glasses of water, regular meal times, and stress management. Probiotics support gut microbiome health.",
      ta: "செரிமான அமைப்பு தினமும் 2-3 லிட்டர் உணவு மற்றும் திரவத்தை செயலாக்குகிறது. உங்கள் குடலில் டிரில்லியன் கணக்கான நன்மை பயக்கும் பாக்டீரியாக்கள் உள்ளன, அவை உணவை உடைத்து நோய் எதிர்ப்பு சக்தியை ஆதரிக்க உதவுகின்றன। தினமும் 25-35 கிராம் நார்ச்சத்து, 8-10 கிளாஸ் தண்ணீர், வழக்கமான உணவு நேரங்கள் மற்றும் மன அழுத்த மேலாண்மையுடன் செரிமான ஆரோக்கியத்தை பராமரிக்கவும்।",
      hi: "पाचन तंत्र दैनिक 2-3 लीटर भोजन और तरल को प्रसंस्करण करता है। आपकी आंत में खरबों लाभकारी बैक्टीरिया होते हैं जो भोजन को तोड़ने और प्रतिरक्षा कार्य का समर्थन करने में मदद करते हैं। दैनिक 25-35 ग्राम फाइबर, 8-10 गिलास पानी, नियमित भोजन समय, और तनाव प्रबंधन के साथ पाचन स्वास्थ्य बनाए रखें।",
    },
    views: "28.5K",
  },
  {
    id: "4",
    title: "Skin Health Fundamentals: Care, Conditions, and Prevention",
    category: "Skin",
    language: "Multi-language",
    thumbnail: "/skincare-routine-demonstration.png",
    description:
      "Essential skincare knowledge covering daily routines, common skin conditions, and when to consult a dermatologist.",
    educationalContent: {
      en: "Healthy skin requires consistent care and protection. Basic routine: gentle cleanser twice daily, moisturizer with ceramides or hyaluronic acid, and broad-spectrum SPF 30+ sunscreen (reapply every 2 hours). Acne affects 85% of people aged 12-24, caused by excess oil, clogged pores, bacteria, and inflammation. Treatment includes salicylic acid (0.5-2%), benzoyl peroxide (2.5-10%), or retinoids.",
      ta: "ஆரோக்கியமான தோலுக்கு நிலையான பராமரிப்பு மற்றும் பாதுகாப்பு தேவை. அடிப்படை வழக்கம்: தினமும் இரண்டு முறை மென்மையான க்ளென்சர், செராமைடுகள் அல்லது ஹைலூரோனிக் அமிலத்துடன் மாய்ஸ்சரைசர், மற்றும் பரந்த-ஸ்பெக்ட்ரம் SPF 30+ சன்ஸ்கிரீன் (ஒவ்வொரு 2 மணி நேரத்திற்கும் மீண்டும் பயன்படுத்தவும்).",
      hi: "स्वस्थ त्वचा के लिए निरंतर देखभाल और सुरक्षा की आवश्यकता होती है। बुनियादी दिनचर्या: दिन में दो बार कोमल क्लींजर, सेरामाइड्स या हायल्यूरोनिक एसिड के साथ मॉइस्चराइज़र, और व्यापक-स्पेक्ट्रम SPF 30+ सनस्क्रीन (हर 2 घंटे में फिर से लगाएं)।",
    },
    views: "41.3K",
  },
  {
    id: "5",
    title: "Mental Health Awareness: Managing Stress, Anxiety, and Depression",
    category: "Mental Health",
    language: "Multi-language",
    thumbnail: "/mindful-meditation.png",
    description:
      "Comprehensive mental health guide covering stress management, anxiety coping strategies, and recognizing depression symptoms.",
    educationalContent: {
      en: "Mental health affects 1 in 4 people annually. Stress activates fight-or-flight response; chronic stress increases cortisol, affecting immune function, sleep, and cardiovascular health. Effective stress management includes 150 minutes weekly moderate exercise, 7-9 hours sleep, balanced nutrition, and relaxation techniques. Practice 4-7-8 breathing: inhale 4 counts, hold 7, exhale 8.",
      ta: "மனநலம் ஆண்டுதோறும் 4 பேரில் 1 பேரை பாதிக்கிறது. மன அழுத்தம் போராட்டம்-அல்லது-பறப்பு பதிலை செயல்படுத்துகிறது; நாள்பட்ட மன அழுத்தம் கார்டிசோலை அதிகரிக்கிறது, நோய் எதிர்ப்பு சக்தி, தூக்கம் மற்றும் இருதய ஆரோக்கியத்தை பாதிக்கிறது। பயனுள்ள மன அழுத்த மேலாண்மையில் வாரத்திற்கு 150 நிமிடங்கள் மிதமான உடற்பயிற்சி, 7-9 மணி நேர தூக்கம், சமச்சீர் ஊட்டச்சத்து மற்றும் தளர்வு நுட்பங்கள் அடங்கும்.",
      hi: "मानसिक स्वास्थ्य सालाना 4 में से 1 व्यक्ति को प्रभावित करता है। तनाव लड़ाई-या-उड़ान प्रतिक्रिया को सक्रिय करता है; पुराना तनाव कॉर्टिसोल बढ़ाता है, प्रतिरक्षा कार्य, नींद, और हृदय स्वास्थ्य को प्रभावित करता है। प्रभावी तनाव प्रबंधन में साप्ताहिक 150 मिनट मध्यम व्यायाम, 7-9 घंटे की नींद, संतुलित पोषण, और विश्राम तकनीकें शामिल हैं।",
    },
    views: "67.9K",
  },
  {
    id: "6",
    title: "Joint Pain Relief: Exercises and Treatment Options",
    category: "Pain",
    language: "Multi-language",
    thumbnail: "/joint-pain-exercises.png",
    description:
      "Evidence-based approaches to managing joint pain through exercise, lifestyle modifications, and medical treatments.",
    educationalContent: {
      en: "Joint pain affects 54 million adults in the US. Osteoarthritis, the most common form, involves cartilage breakdown typically affecting knees, hips, hands, and spine. Risk factors include age, obesity, previous injury, and genetics. Management includes maintaining healthy BMI, low-impact exercises like swimming, cycling, and walking 150 minutes weekly.",
      ta: "மூட்டு வலி அமெரிக்காவில் 54 மில்லியன் பெரியவர்களை பாதிக்கிறது. மிகவும் பொதுவான வடிவமான ஆஸ்டியோ ஆர்த்ரைடிஸ், பொதுவாக முழங்கால்கள், இடுப்புகள், கைகள் மற்றும் முதுகெலும்பை பாதிக்கும் குருத்தெலும்பு முறிவை உள்ளடக்கியது. ஆபத்து காரணிகளில் வயது, உடல் பருமன், முந்தைய காயம் மற்றும் மரபியல் அடங்கும்.",
      hi: "संयुक्त दर्द अमेरिका में 54 मिलियन वयस्कों को प्रभावित करता है। सबसे आम रूप ऑस्टियोआर्थराइटिस, उपास्थि टूटने को शामिल करता है जो आमतौर पर घुटनों, कूल्हों, हाथों और रीढ़ को प्रभावित करता है। जोखिम कारकों में उम्र, मोटापा, पिछली चोट, और आनुवंशिकता शामिल हैं।",
    },
    views: "35.7K",
  },
  {
    id: "7",
    title: "Respiratory Health: Breathing Techniques and Lung Care",
    category: "Respiratory",
    language: "Multi-language",
    thumbnail: "/respiratory-health-lungs-breathing.png",
    description:
      "Essential respiratory health information including breathing exercises, lung protection, and recognizing breathing difficulties.",
    educationalContent: {
      en: "Healthy lungs process 12,000-15,000 liters of air daily. The respiratory system delivers oxygen and removes carbon dioxide through 300 million alveoli. Common conditions include asthma (affecting 25 million Americans), characterized by airway inflammation, bronchospasm, and mucus production. Maintain lung health by avoiding smoking and secondhand smoke, exercising regularly, and practicing breathing exercises.",
      ta: "ஆரோக்கியமான நுரையீரல்கள் தினமும் 12,000-15,000 லிட்டர் காற்றை செயலாக்குகின்றன. சுவாச அமைப்பு 300 மில்லியன் அல்வியோலி மூலம் ஆக்ஸிஜனை வழங்குகிறது மற்றும் கார்பன் டை ஆக்சைடை அகற்றுகிறது. பொதுவான நிலைமைகளில் ஆஸ்துமா (25 மில்லியன் அமெரிக்கர்களை பாதிக்கிறது) அடங்கும், இது காற்றுப்பாதை அழற்சி, மூச்சுக்குழாய் பிடிப்பு மற்றும் சளி உற்பத்தி ஆகியவற்றால் வகைப்படுத்தப்படுகிறது.",
      hi: "स्वस्थ फेफड़े दैनिक 12,000-15,000 लीटर हवा को प्रसंस्करण करते हैं। श्वसन तंत्र 300 मिलियन एल्वियोली के माध्यम से ऑक्सीजन प्रदान करता है और कार्बन डाइऑक्साइड को हटाता है। सामान्य स्थितियों में अस्थमा (25 मिलियन अमेरिकियों को प्रभावित करता है) शामिल है, जो वायुमार्ग की सूजन, ब्रोंकोस्पास्म, और बलगम उत्पादन की विशेषता है।",
    },
    views: "29.4K",
  },
  {
    id: "8",
    title: "Heart Health: Prevention and Early Warning Signs",
    category: "Cardiovascular",
    language: "Multi-language",
    thumbnail: "/heart-health-prevention.png",
    description:
      "Comprehensive guide to cardiovascular health, risk factors, prevention strategies, and recognizing heart attack symptoms.",
    educationalContent: {
      en: "Cardiovascular disease causes 655,000 deaths annually in the US. Major risk factors include hypertension (>130/80 mmHg), high LDL cholesterol (>100 mg/dL), diabetes (HbA1c >7%), smoking, obesity (BMI >30), and sedentary lifestyle. Heart-healthy habits include 150 minutes weekly moderate aerobic exercise, Mediterranean diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats.",
      ta: "இருதய நோய் அமெரிக்காவில் ஆண்டுதோறும் 655,000 மரణங்களை ஏற்படுத்துகிறது. முக்கிய ஆபத்து காரணிகளில் உயர் இரத்த அழுத்தம் (>130/80 mmHg), உயர் LDL கொலஸ்ட்ரால் (>100 mg/dL), நீரிழிவு (HbA1c >7%), புகைபிடித்தல், உடல் பருமன் (BMI >30), மற்றும் உட்கார்ந்த வாழ்க்கை முறை அடங்கும்.",
      hi: "हृदय रोग अमेरिका में सालाना 655,000 मौतों का कारण बनता है। प्रमुख जोखिम कारकों में उच्च रक्तचाप (>130/80 mmHg), उच्च LDL कोलेस्ट्रॉल (>100 mg/dL), मधुमेह (HbA1c >7%), धूम्रपान, मोटापा (BMI >30), और गतिहीन जीवनशैली शामिल हैं।",
    },
    views: "52.1K",
  },
]

const categories = ["All", "Fever", "Pain", "Digestion", "Skin", "Mental Health", "Respiratory", "Cardiovascular"]

export function VideoGuidance() {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTopic, setSelectedTopic] = useState<HealthTopic | null>(null)
  const [isActive, setIsActive] = useState(false)

  const filteredTopics =
    selectedCategory === "All" ? healthTopics : healthTopics.filter((topic) => topic.category === selectedCategory)

  const handleTopicSelect = (topic: HealthTopic) => {
    setSelectedTopic(topic)
    setIsActive(true)
  }

  const handleBackToList = () => {
    setSelectedTopic(null)
    setIsActive(false)
  }

  const handleShare = () => {
    console.log("Share topic functionality")
  }

  const handleSave = () => {
    console.log("Save topic functionality")
  }

  // 3D Visualization Screen
  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handleBackToList} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-semibold">{t.healthVisualizations}</h1>
            </div>
          </div>

          <div className="space-y-4">
            {/* 3D Visualization */}
            <div className="px-6 pt-4">
              <Medical3DVisualizations category={selectedTopic.category} isActive={isActive} />
            </div>

            <div className="px-6 space-y-4">
              {/* Topic Info */}
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">{selectedTopic.title}</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {selectedTopic.language}
                  </div>
                  <span>{selectedTopic.views} views</span>
                </div>
                <p className="text-sm text-muted-foreground">{selectedTopic.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="flex-1 bg-transparent">
                  <Share className="w-4 h-4 mr-2" />
                  {t.share}
                </Button>
                <Button variant="outline" size="sm" onClick={handleSave} className="flex-1 bg-transparent">
                  <Bookmark className="w-4 h-4 mr-2" />
                  {t.save}
                </Button>
              </div>

              {/* Educational Content */}
              <Card className="p-4">
                <h3 className="font-medium text-foreground mb-2">{t.educationalContent}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedTopic.educationalContent[t.language as keyof typeof selectedTopic.educationalContent] ||
                    selectedTopic.educationalContent.en}
                </p>
              </Card>

              {/* Next Steps */}
              <Card className="p-4">
                <h3 className="font-medium text-foreground mb-3">{t.nextSteps}</h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                    onClick={() => router.push("/symptoms")}
                  >
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" />
                      {t.checkYourSymptoms}
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                    onClick={() => router.push("/agent")}
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {t.talkToAgent}
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Health Topics Library Screen
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Medical3DScene />

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="bg-card/90 backdrop-blur-sm border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">{t.healthVisualizations}</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Top Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground drop-shadow-sm">{t.learnHealth}</h2>

            {/* Filter Dropdown */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full bg-background/80 backdrop-blur-sm">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "All" ? t.allTopics : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Topics Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">
                {selectedCategory === "All" ? t.allTopics : selectedCategory}
                <span className="text-muted-foreground ml-2">({filteredTopics.length})</span>
              </h3>
            </div>

            <div className="space-y-4">
              {filteredTopics.map((topic) => (
                <Card
                  key={topic.id}
                  className="p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105 bg-card/90 backdrop-blur-sm"
                  onClick={() => handleTopicSelect(topic)}
                >
                  <div className="flex gap-3 p-3">
                    {/* Thumbnail */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={topic.thumbnail || "/placeholder.svg"}
                        alt={topic.title}
                        className="w-24 h-16 object-cover rounded bg-muted"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-black/70 rounded-full flex items-center justify-center">
                          <Play className="w-3 h-3 text-white ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Topic Info */}
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm text-foreground line-clamp-2">{topic.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {topic.language}
                        </div>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                          {topic.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{topic.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
