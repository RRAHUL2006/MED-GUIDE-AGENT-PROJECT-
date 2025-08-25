"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Box, Cylinder, Torus } from "@react-three/drei"
import type * as THREE from "three"
import { useLanguage } from "@/contexts/language-context"

interface Medical3DVisualizationProps {
  category: string
  isActive: boolean
}

// 3D Heart Model
function HeartModel({ isActive }: { isActive: boolean }) {
  const heartRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (heartRef.current && isActive) {
      heartRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.1
      heartRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group ref={heartRef}>
      {/* Heart chambers */}
      <Sphere args={[0.8, 16, 16]} position={[-0.3, 0.2, 0]}>
        <meshStandardMaterial color="#ff4444" />
      </Sphere>
      <Sphere args={[0.7, 16, 16]} position={[0.3, 0.2, 0]}>
        <meshStandardMaterial color="#ff6666" />
      </Sphere>
      <Sphere args={[0.6, 16, 16]} position={[-0.2, -0.4, 0]}>
        <meshStandardMaterial color="#ff4444" />
      </Sphere>
      <Sphere args={[0.5, 16, 16]} position={[0.2, -0.4, 0]}>
        <meshStandardMaterial color="#ff6666" />
      </Sphere>

      {/* Blood vessels */}
      <Cylinder args={[0.1, 0.1, 1.5]} position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <meshStandardMaterial color="#aa2222" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 1.2]} position={[0.5, 1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="#aa2222" />
      </Cylinder>
    </group>
  )
}

// 3D Brain Model
function BrainModel({ isActive }: { isActive: boolean }) {
  const brainRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (brainRef.current && isActive) {
      brainRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={brainRef}>
      {/* Brain hemispheres */}
      <Sphere args={[1, 16, 16]} position={[-0.3, 0, 0]}>
        <meshStandardMaterial color="#ffaacc" />
      </Sphere>
      <Sphere args={[1, 16, 16]} position={[0.3, 0, 0]}>
        <meshStandardMaterial color="#ffaacc" />
      </Sphere>

      {/* Neural pathways */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Cylinder
          key={i}
          args={[0.02, 0.02, 0.5]}
          position={[
            Math.cos((i * Math.PI) / 4) * 0.8,
            Math.sin((i * Math.PI) / 4) * 0.3,
            Math.sin((i * Math.PI) / 4) * 0.8,
          ]}
          rotation={[(i * Math.PI) / 4, 0, 0]}
        >
          <meshStandardMaterial color="#4488ff" emissive="#2244aa" emissiveIntensity={0.3} />
        </Cylinder>
      ))}
    </group>
  )
}

// 3D Lungs Model
function LungsModel({ isActive }: { isActive: boolean }) {
  const lungsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (lungsRef.current && isActive) {
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      lungsRef.current.scale.set(breathe, breathe, breathe)
    }
  })

  return (
    <group ref={lungsRef}>
      {/* Left lung */}
      <Sphere args={[0.8, 16, 16]} position={[-0.6, 0, 0]}>
        <meshStandardMaterial color="#ff88aa" transparent opacity={0.8} />
      </Sphere>
      {/* Right lung */}
      <Sphere args={[0.8, 16, 16]} position={[0.6, 0, 0]}>
        <meshStandardMaterial color="#ff88aa" transparent opacity={0.8} />
      </Sphere>

      {/* Bronchi */}
      <Cylinder args={[0.1, 0.05, 1]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#aa4466" />
      </Cylinder>
      <Cylinder args={[0.05, 0.03, 0.6]} position={[-0.3, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <meshStandardMaterial color="#aa4466" />
      </Cylinder>
      <Cylinder args={[0.05, 0.03, 0.6]} position={[0.3, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <meshStandardMaterial color="#aa4466" />
      </Cylinder>
    </group>
  )
}

// 3D Digestive System Model
function DigestiveModel({ isActive }: { isActive: boolean }) {
  const digestiveRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (digestiveRef.current && isActive) {
      digestiveRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group ref={digestiveRef}>
      {/* Stomach */}
      <Sphere args={[0.6, 16, 16]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#ffaa44" />
      </Sphere>

      {/* Intestines */}
      <Torus args={[0.8, 0.15]} position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff8844" />
      </Torus>
      <Torus args={[0.5, 0.1]} position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ff6644" />
      </Torus>

      {/* Liver */}
      <Box args={[1, 0.5, 0.8]} position={[0.8, 0.3, 0]}>
        <meshStandardMaterial color="#884422" />
      </Box>
    </group>
  )
}

// 3D Skeleton/Joint Model
function SkeletonModel({ isActive }: { isActive: boolean }) {
  const skeletonRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (skeletonRef.current && isActive) {
      skeletonRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={skeletonRef}>
      {/* Bones */}
      <Cylinder args={[0.1, 0.1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#eeeecc" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 1.5]} position={[-0.5, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#eeeecc" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 1.5]} position={[0.5, -0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="#eeeecc" />
      </Cylinder>

      {/* Joints */}
      <Sphere args={[0.15]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#ffccaa" />
      </Sphere>
      <Sphere args={[0.12]} position={[-0.3, -0.2, 0]}>
        <meshStandardMaterial color="#ffccaa" />
      </Sphere>
      <Sphere args={[0.12]} position={[0.3, -0.2, 0]}>
        <meshStandardMaterial color="#ffccaa" />
      </Sphere>
    </group>
  )
}

// 3D Fever/Temperature Model
function FeverModel({ isActive }: { isActive: boolean }) {
  const feverRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (feverRef.current && isActive) {
      const heat = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1
      feverRef.current.scale.setScalar(heat)
    }
  })

  return (
    <group ref={feverRef}>
      {/* Thermometer */}
      <Cylinder args={[0.05, 0.05, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#cccccc" />
      </Cylinder>
      <Sphere args={[0.15]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#ff4444" />
      </Sphere>

      {/* Heat waves */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Torus key={i} args={[0.3 + i * 0.2, 0.02]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#ff6644"
            transparent
            opacity={0.6 - i * 0.1}
            emissive="#ff2222"
            emissiveIntensity={0.2}
          />
        </Torus>
      ))}
    </group>
  )
}

export function Medical3DVisualizations({ category, isActive }: Medical3DVisualizationProps) {
  const { t, language } = useLanguage()

  const getModelByCategory = () => {
    switch (category) {
      case "Cardiovascular":
        return <HeartModel isActive={isActive} />
      case "Mental Health":
      case "Pain":
        return <BrainModel isActive={isActive} />
      case "Respiratory":
        return <LungsModel isActive={isActive} />
      case "Digestion":
        return <DigestiveModel isActive={isActive} />
      case "Skin":
        return <SkeletonModel isActive={isActive} />
      case "Fever":
      default:
        return <FeverModel isActive={isActive} />
    }
  }

  const getEducationalText = () => {
    const texts = {
      en: {
        Fever:
          "Fever is your body's natural defense mechanism. Normal temperature: 97-99°F (36.1-37.2°C). Seek medical attention if fever exceeds 103°F (39.4°C) or persists for more than 3 days.",
        Pain: "Pain signals help protect your body from harm. Chronic pain affects the nervous system. Practice stress management, gentle exercise, and consult healthcare providers for persistent pain.",
        Digestion:
          "Your digestive system processes 2-3 liters daily. Maintain gut health with fiber (25-35g daily), probiotics, and regular meal times. Seek help for persistent symptoms.",
        Skin: "Skin is your body's largest organ. Use gentle cleansers, moisturize daily, and apply SPF 30+ sunscreen. Perform monthly self-exams for changes in moles or lesions.",
        "Mental Health":
          "Mental health affects 1 in 4 people. Practice stress management through exercise, meditation, and social connections. Seek professional help when needed.",
        Respiratory:
          "Lungs process 12,000-15,000 liters of air daily. Practice breathing exercises, avoid smoking, and maintain good posture for optimal respiratory health.",
        Cardiovascular:
          "Heart disease is preventable. Maintain healthy weight, exercise 150 minutes weekly, eat heart-healthy foods, and monitor blood pressure and cholesterol regularly.",
      },
      ta: {
        Fever:
          "காய்ச்சல் உங்கள் உடலின் இயற்கையான பாதுகாப்பு வழிமுறை. சாதாரண வெப்பநிலை: 97-99°F (36.1-37.2°C). காய்ச்சல் 103°F (39.4°C) மீறினால் அல்லது 3 நாட்களுக்கு மேல் நீடித்தால் மருத்துவ உதவி பெறவும்.",
        Pain: "வலி சமிக்ஞைகள் உங்கள் உடலை தீங்கிலிருந்து பாதுகாக்க உதவுகின்றன. நாள்பட்ட வலி நரம்பு மண்டலத்தை பாதிக்கிறது. மன அழுத்த மேலாண்மை, மென்மையான உடற்பயிற்சி மற்றும் தொடர்ச்சியான வலிக்கு மருத்துவ ஆலோசனை பெறவும்.",
        Digestion:
          "உங்கள் செரிமான அமைப்பு தினமும் 2-3 லிட்டர் செயலாக்குகிறது. நார்ச்சத்து (தினமும் 25-35கிராம்), புரோபயாடிக்ஸ் மற்றும் வழக்கமான உணவு நேரங்களுடன் குடல் ஆரோக்கியத்தை பராமரிக்கவும்.",
        Skin: "தோல் உங்கள் உடலின் மிகப்பெரிய உறுப்பு. மென்மையான சுத்தப்படுத்திகளைப் பயன்படுத்தவும், தினமும் ஈரப்பதமாக்கவும், SPF 30+ சன்ஸ்கிரீன் பயன்படுத்தவும். மச்சங்கள் அல்லது புண்களில் மாற்றங்களுக்கு மாதாந்திர சுய பரிசோதனை செய்யவும்.",
        "Mental Health":
          "மனநலம் 4 பேரில் 1 பேரை பாதிக்கிறது. உடற்பயிற்சி, தியானம் மற்றும் சமூக தொடர்புகள் மூலம் மன அழுத்த மேலாண்மையை பயிற்சி செய்யவும். தேவைப்படும்போது தொழில்முறை உதவி பெறவும்.",
        Respiratory:
          "நுரையீரல்கள் தினமும் 12,000-15,000 லிட்டர் காற்றை செயலாக்குகின்றன. சுவாச பயிற்சிகளை பயிற்சி செய்யவும், புகைபிடிப்பதை தவிர்க்கவும், உகந்த சுவாச ஆரோக்கியத்திற்கு நல்ல தோற்றத்தை பராமரிக்கவும்.",
        Cardiovascular:
          "இதய நோய் தடுக்கக்கூடியது. ஆரோக்கியமான எடையை பராமரிக்கவும், வாரத்திற்கு 150 நிமிடங்கள் உடற்பயிற்சி செய்யவும், இதய-ஆரோக்கியமான உணவுகளை சாப்பிடவும், இரத்த அழுத்தம் மற்றும் கொலஸ்ட்ராலை வழக்கமாக கண்காணிக்கவும்.",
      },
      hi: {
        Fever:
          "बुखार आपके शरीर का प्राकृतिक रक्षा तंत्र है। सामान्य तापमान: 97-99°F (36.1-37.2°C)। यदि बुखार 103°F (39.4°C) से अधिक हो या 3 दिनों से अधिक बना रहे तो चिकित्सा सहायता लें।",
        Pain: "दर्द के संकेत आपके शरीर को नुकसान से बचाने में मदद करते हैं। पुराना दर्द तंत्रिका तंत्र को प्रभावित करता है। तनाव प्रबंधन, हल्का व्यायाम और लगातार दर्द के लिए स्वास्थ्य सेवा प्रदाताओं से सलाह लें।",
        Digestion:
          "आपका पाचन तंत्र दैनिक 2-3 लीटर प्रसंस्करण करता है। फाइबर (दैनिक 25-35 ग्राम), प्रोबायोटिक्स और नियमित भोजन समय के साथ आंत स्वास्थ्य बनाए रखें।",
        Skin: "त्वचा आपके शरीर का सबसे बड़ा अंग है। कोमल क्लींजर का उपयोग करें, दैनिक मॉइस्चराइज़ करें, और SPF 30+ सनस्क्रीन लगाएं। तिलों या घावों में बदलाव के लिए मासिक स्व-परीक्षा करें।",
        "Mental Health":
          "मानसिक स्वास्थ्य 4 में से 1 व्यक्ति को प्रभावित करता है। व्यायाम, ध्यान और सामाजिक संपर्कों के माध्यम से तनाव प्रबंधन का अभ्यास करें। जरूरत पड़ने पर पेशेवर मदद लें।",
        Respiratory:
          "फेफड़े दैनिक 12,000-15,000 लीटर हवा को प्रसंस्करण करते हैं। सांस की व्यायाम का अभ्यास करें, धूम्रपान से बचें, और इष्टतम श्वसन स्वास्थ्य के लिए अच्छी मुद्रा बनाए रखें।",
        Cardiovascular:
          "हृदय रोग रोकथाम योग्य है। स्वस्थ वजन बनाए रखें, साप्ताहिक 150 मिनट व्यायाम करें, हृदय-स्वस्थ भोजन खाएं, और नियमित रूप से रक्तचाप और कोलेस्ट्रॉल की निगरानी करें।",
      },
    }

    return (
      texts[language as keyof typeof texts]?.[category as keyof typeof texts.en] ||
      texts.en[category as keyof typeof texts.en] ||
      ""
    )
  }

  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {getModelByCategory()}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={isActive}
          autoRotateSpeed={1}
        />
      </Canvas>

      {/* Educational Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 rounded-t-lg">
        <p className="text-sm leading-relaxed">{getEducationalText()}</p>
      </div>
    </div>
  )
}
