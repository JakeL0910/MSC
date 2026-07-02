// ----------------------------------------------------------------------------
// HEALTHCARE PHRASE LIBRARY
// Powers the searchable phrase cards at /phrase-library.
// Add phrases here — each needs an English phrase, Spanish equivalent,
// a category, and a short context note. Educational support only; these
// never replace professional medical interpretation.
// ----------------------------------------------------------------------------

export interface Phrase {
  id: string
  en: string
  es: string
  category: PhraseCategory
  context: string
}

export type PhraseCategory =
  | 'Appointments'
  | 'At the Clinic'
  | 'Pharmacy'
  | 'Insurance & Billing'
  | 'Asking for Help'

export const phraseCategories: PhraseCategory[] = [
  'Appointments',
  'At the Clinic',
  'Pharmacy',
  'Insurance & Billing',
  'Asking for Help',
]

export const phrases: Phrase[] = [
  // --- Appointments ---------------------------------------------------------
  {
    id: 'appt-1',
    en: 'I would like to make an appointment.',
    es: 'Quisiera hacer una cita.',
    category: 'Appointments',
    context: 'Calling or visiting the front desk to schedule a visit.',
  },
  {
    id: 'appt-2',
    en: 'I need to cancel my appointment.',
    es: 'Necesito cancelar mi cita.',
    category: 'Appointments',
    context: 'Call as early as possible — many offices have cancellation policies.',
  },
  {
    id: 'appt-3',
    en: 'Do you have anything earlier?',
    es: '¿Tiene algo más temprano?',
    category: 'Appointments',
    context: 'Asking for a sooner appointment date or time.',
  },
  {
    id: 'appt-4',
    en: 'This is my first visit.',
    es: 'Esta es mi primera visita.',
    category: 'Appointments',
    context: 'New patients usually need to arrive early to fill out forms.',
  },
  {
    id: 'appt-5',
    en: 'I’m here for my two o’clock appointment.',
    es: 'Vengo a mi cita de las dos.',
    category: 'Appointments',
    context: 'Checking in at the front desk when you arrive.',
  },

  // --- At the Clinic ----------------------------------------------------------
  {
    id: 'clinic-1',
    en: 'It hurts here.',
    es: 'Me duele aquí.',
    category: 'At the Clinic',
    context: 'Point to the area while saying it — simple and clear.',
  },
  {
    id: 'clinic-2',
    en: 'The pain started three days ago.',
    es: 'El dolor empezó hace tres días.',
    category: 'At the Clinic',
    context: 'Providers almost always ask when symptoms began.',
  },
  {
    id: 'clinic-3',
    en: 'I am allergic to penicillin.',
    es: 'Soy alérgico/a a la penicilina.',
    category: 'At the Clinic',
    context: 'State allergies early — swap in your own allergy.',
  },
  {
    id: 'clinic-4',
    en: 'Could you explain that more slowly, please?',
    es: '¿Podría explicarlo más despacio, por favor?',
    category: 'At the Clinic',
    context: 'It is always okay to ask a provider to slow down.',
  },
  {
    id: 'clinic-5',
    en: 'I take medication for high blood pressure.',
    es: 'Tomo medicamento para la presión alta.',
    category: 'At the Clinic',
    context: 'Bring a list of your current medications to every visit.',
  },
  {
    id: 'clinic-6',
    en: 'What are the next steps?',
    es: '¿Cuáles son los siguientes pasos?',
    category: 'At the Clinic',
    context: 'A good closing question before leaving any appointment.',
  },

  // --- Pharmacy -----------------------------------------------------------------
  {
    id: 'pharm-1',
    en: 'I’m picking up a prescription.',
    es: 'Vengo a recoger una receta.',
    category: 'Pharmacy',
    context: 'At the pharmacy pickup counter; have your name and birthdate ready.',
  },
  {
    id: 'pharm-2',
    en: 'How many times a day do I take this?',
    es: '¿Cuántas veces al día tomo esto?',
    category: 'Pharmacy',
    context: 'Confirm dosage instructions before leaving the counter.',
  },
  {
    id: 'pharm-3',
    en: 'Should I take it with food?',
    es: '¿Debo tomarlo con comida?',
    category: 'Pharmacy',
    context: 'Some medications work best with — or without — food.',
  },
  {
    id: 'pharm-4',
    en: 'Does this have side effects?',
    es: '¿Esto tiene efectos secundarios?',
    category: 'Pharmacy',
    context: 'Pharmacists can explain common side effects to watch for.',
  },
  {
    id: 'pharm-5',
    en: 'Is there a generic version?',
    es: '¿Hay una versión genérica?',
    category: 'Pharmacy',
    context: 'Generic medications are usually much less expensive.',
  },
  {
    id: 'pharm-6',
    en: 'I need a refill.',
    es: 'Necesito un resurtido de mi receta.',
    category: 'Pharmacy',
    context: 'The label shows how many refills remain (“refills: 2”).',
  },

  // --- Insurance & Billing --------------------------------------------------------
  {
    id: 'ins-1',
    en: 'Do you accept my insurance?',
    es: '¿Aceptan mi seguro?',
    category: 'Insurance & Billing',
    context: 'Ask before the visit if possible; show your insurance card.',
  },
  {
    id: 'ins-2',
    en: 'How much is the copay?',
    es: '¿Cuánto es el copago?',
    category: 'Insurance & Billing',
    context: 'The fixed amount you pay at the visit; it varies by plan.',
  },
  {
    id: 'ins-3',
    en: 'Can I get an itemized bill?',
    es: '¿Me puede dar una factura detallada?',
    category: 'Insurance & Billing',
    context: 'An itemized bill lists every charge — useful for spotting errors.',
  },
  {
    id: 'ins-4',
    en: 'I have a question about this bill.',
    es: 'Tengo una pregunta sobre esta factura.',
    category: 'Insurance & Billing',
    context: 'Call the billing office number printed on the statement.',
  },
  {
    id: 'ins-5',
    en: 'Do you offer a payment plan?',
    es: '¿Ofrecen un plan de pagos?',
    category: 'Insurance & Billing',
    context: 'Many clinics and hospitals offer payment plans if you ask.',
  },

  // --- Asking for Help ---------------------------------------------------------------
  {
    id: 'help-1',
    en: 'I would like an interpreter, please.',
    es: 'Quisiera un intérprete, por favor.',
    category: 'Asking for Help',
    context: 'You have the right to ask — many facilities must provide one.',
  },
  {
    id: 'help-2',
    en: 'Could you write that down for me?',
    es: '¿Me lo puede escribir, por favor?',
    category: 'Asking for Help',
    context: 'Written instructions are easier to review and translate later.',
  },
  {
    id: 'help-3',
    en: 'I don’t understand. Could you repeat that?',
    es: 'No entiendo. ¿Puede repetirlo?',
    category: 'Asking for Help',
    context: 'Never leave an appointment with unanswered confusion.',
  },
  {
    id: 'help-4',
    en: 'Is this information available in Spanish?',
    es: '¿Esta información está disponible en español?',
    category: 'Asking for Help',
    context: 'Many offices have translated materials — but only if you ask.',
  },
]
