// ----------------------------------------------------------------------------
// MSC LEARN — flashcard mini-lessons for /learn.
// Each deck is a short, focused vocabulary set. Add decks or cards here;
// the flashcard UI renders them automatically.
// ----------------------------------------------------------------------------

export interface Flashcard {
  front: string // the term or phrase (English)
  back: string // the explanation or translation
  example?: string
}

export interface LearnDeck {
  slug: string
  title: string
  description: string
  level: 'Starter' | 'Everyday' | 'Confident'
  icon: string
  cards: Flashcard[]
}

export const learnDecks: LearnDeck[] = [
  {
    slug: 'clinic-visit-basics',
    title: 'Clinic Visit Basics',
    description: 'The eight words you’ll hear at almost every medical appointment.',
    level: 'Starter',
    icon: 'heart',
    cards: [
      {
        front: 'Appointment',
        back: 'Cita — a scheduled time to see a provider.',
        example: '“Your appointment is at 2:00 on Tuesday.”',
      },
      {
        front: 'Symptoms',
        back: 'Síntomas — what you feel when something is wrong (pain, fever, cough).',
        example: '“What symptoms have you been having?”',
      },
      {
        front: 'Check-in',
        back: 'Registro — telling the front desk you have arrived.',
        example: '“Please check in at the front desk.”',
      },
      {
        front: 'Referral',
        back: 'Referencia — when your doctor sends you to a specialist.',
        example: '“I’ll give you a referral to a dermatologist.”',
      },
      {
        front: 'Follow-up',
        back: 'Seguimiento — a later visit to see how you’re doing.',
        example: '“Schedule a follow-up in two weeks.”',
      },
      {
        front: 'Medical history',
        back: 'Historial médico — your past illnesses, surgeries, and conditions.',
        example: '“The form asks about your medical history.”',
      },
      {
        front: 'Allergy',
        back: 'Alergia — a bad reaction your body has to something.',
        example: '“Do you have any medication allergies?”',
      },
      {
        front: 'Vital signs',
        back: 'Signos vitales — basic measurements: blood pressure, temperature, pulse.',
        example: '“The nurse will take your vital signs first.”',
      },
    ],
  },
  {
    slug: 'pharmacy-essentials',
    title: 'Pharmacy Essentials',
    description: 'Understand prescription labels and pharmacy conversations.',
    level: 'Everyday',
    icon: 'beaker',
    cards: [
      {
        front: 'Prescription',
        back: 'Receta — the medication order your provider writes for you.',
        example: '“Take this prescription to the pharmacy.”',
      },
      {
        front: 'Dosage',
        back: 'Dosis — how much medication to take, and how often.',
        example: '“The dosage is one tablet twice a day.”',
      },
      {
        front: 'Refill',
        back: 'Resurtido — getting more of the same prescription.',
        example: '“You have two refills left.”',
      },
      {
        front: 'Generic',
        back: 'Genérico — a lower-cost version of a brand-name medication.',
        example: '“Is a generic available? It’s usually cheaper.”',
      },
      {
        front: 'Side effects',
        back: 'Efectos secundarios — unwanted effects a medication may cause.',
        example: '“Common side effects include drowsiness.”',
      },
      {
        front: 'Over-the-counter',
        back: 'Sin receta — medication you can buy without a prescription.',
        example: '“Ibuprofen is available over the counter.”',
      },
      {
        front: 'Expiration date',
        back: 'Fecha de caducidad — the date after which medicine should not be used.',
        example: '“Check the expiration date on the bottle.”',
      },
      {
        front: 'As needed',
        back: 'Según sea necesario — take it only when you have symptoms.',
        example: '“Take one tablet as needed for pain.”',
      },
    ],
  },
  {
    slug: 'insurance-decoded',
    title: 'Insurance, Decoded',
    description: 'The vocabulary of U.S. health insurance, minus the confusion.',
    level: 'Confident',
    icon: 'shield-check',
    cards: [
      {
        front: 'Premium',
        back: 'Prima — the amount you pay every month to have insurance.',
        example: '“The monthly premium is $200.”',
      },
      {
        front: 'Copay',
        back: 'Copago — a fixed amount you pay at each visit.',
        example: '“There’s a $25 copay for office visits.”',
      },
      {
        front: 'Deductible',
        back: 'Deducible — what you pay yourself each year before insurance starts helping.',
        example: '“You haven’t met your deductible yet.”',
      },
      {
        front: 'In-network',
        back: 'Dentro de la red — providers your plan covers at lower cost.',
        example: '“Make sure the clinic is in-network.”',
      },
      {
        front: 'Claim',
        back: 'Reclamación — the bill your provider sends to your insurance.',
        example: '“The claim was submitted last week.”',
      },
      {
        front: 'Prior authorization',
        back: 'Autorización previa — approval insurance requires before some services.',
        example: '“The MRI needs prior authorization.”',
      },
      {
        front: 'Explanation of Benefits (EOB)',
        back: 'Explicación de beneficios — a statement showing what insurance paid. Not a bill.',
        example: '“The EOB says: this is not a bill.”',
      },
      {
        front: 'Out-of-pocket maximum',
        back: 'Gasto máximo de bolsillo — the most you’ll pay in a year before insurance covers 100%.',
        example: '“After the out-of-pocket max, covered care is free.”',
      },
    ],
  },
  {
    slug: 'everyday-communication',
    title: 'Everyday Communication',
    description: 'Polite, practical phrases for school, work, and community life.',
    level: 'Starter',
    icon: 'chat',
    cards: [
      {
        front: 'Could you repeat that, please?',
        back: '¿Puede repetirlo, por favor? — the most useful sentence in any language.',
      },
      {
        front: 'I’m still learning English.',
        back: 'Todavía estoy aprendiendo inglés. — sets patient expectations kindly.',
      },
      {
        front: 'Could you speak more slowly?',
        back: '¿Puede hablar más despacio? — a fair request in any conversation.',
      },
      {
        front: 'How do you spell that?',
        back: '¿Cómo se escribe? — essential for names, addresses, and forms.',
      },
      {
        front: 'Where do I sign?',
        back: '¿Dónde firmo? — for forms at school, work, or the clinic.',
      },
      {
        front: 'I have a question.',
        back: 'Tengo una pregunta. — simple, direct, always appropriate.',
      },
      {
        front: 'Thank you for your patience.',
        back: 'Gracias por su paciencia. — goodwill goes a long way.',
      },
      {
        front: 'Could you write that down?',
        back: '¿Me lo puede escribir? — written info is easier to review later.',
      },
    ],
  },
]

export function getDeck(slug: string): LearnDeck | undefined {
  return learnDecks.find((d) => d.slug === slug)
}
