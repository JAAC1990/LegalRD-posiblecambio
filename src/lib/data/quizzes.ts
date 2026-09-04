export interface QuizQuestionData {
  id: string;
  questionText: string;
  options: { id: string; text: string }[];
  correctOption: string;
  explanation: string;
  legalBasis: string;
  articleUrl?: string;
}

export interface QuizData {
  id: string;
  title: string;
  specialty: string;
  difficulty: string;
  description: string;
  timeLimitMinutes: number;
  questions: QuizQuestionData[];
}

export const DOMINICAN_QUIZZES: QuizData[] = [
  {
    id: 'derecho-laboral-desahucio',
    title: 'Derecho Laboral: Contrato de Trabajo, Desahucio y Cesantía',
    specialty: 'Derecho Laboral',
    difficulty: 'Intermedio',
    timeLimitMinutes: 10,
    description: 'Evalúa tus conocimientos sobre la subordinación jurídica, plazos de preaviso y escala de cálculo del auxilio de cesantía conforme al Código de Trabajo (Ley 16-92).',
    questions: [
      {
        id: 'q1',
        questionText: '¿Cuál es el elemento determinante que tipifica jurídicamente la existencia de un contrato de trabajo según el Artículo 1 del Código de Trabajo?',
        options: [
          { id: 'A', text: 'La exclusividad absoluta de servicios' },
          { id: 'B', text: 'La subordinación jurídica (dependencia y dirección inmediata o delegada)' },
          { id: 'C', text: 'La firma de un documento escrito ante notario público' },
          { id: 'D', text: 'El pago mediante transferencia bancaria' },
        ],
        correctOption: 'B',
        explanation: 'El Artículo 1 de la Ley 16-92 define el contrato de trabajo por la obligación de prestar un servicio personal bajo la dependencia y dirección inmediata o delegada del empleador (subordinación jurídica).',
        legalBasis: 'Artículo 1 del Código de Trabajo (Ley 16-92)',
        articleUrl: '/normas/codigo-de-trabajo-ley-16-92/articulo/1',
      },
      {
        id: 'q2',
        questionText: 'Conforme al Artículo 80 del Código de Trabajo, ¿qué importe de auxilio de cesantía corresponde a un trabajador con más de 5 años de servicio continuo tras ser desahuciado?',
        options: [
          { id: 'A', text: '15 días de salario ordinario por cada año de servicio' },
          { id: 'B', text: '21 días de salario ordinario por cada año de servicio' },
          { id: 'C', text: '23 días de salario ordinario por cada año de servicio prestado' },
          { id: 'D', text: 'Un mes de salario por año sin límite alguno' },
        ],
        correctOption: 'C',
        explanation: 'El numeral 4 del Art. 80 establece expresamente: "Después de un trabajo continuo no menor de cinco años, una suma igual a veintitrés días de salario ordinario por cada año de servicio prestado".',
        legalBasis: 'Artículo 80, numeral 4 del Código de Trabajo',
        articleUrl: '/normas/codigo-de-trabajo-ley-16-92/articulo/80',
      },
      {
        id: 'q3',
        questionText: '¿Cuál es el divisor reglamentario establecido por el Reglamento 258-93 para determinar el salario diario promedio a partir del salario mensual?',
        options: [
          { id: 'A', text: '30 días' },
          { id: 'B', text: '23.83 días' },
          { id: 'C', text: '26 días' },
          { id: 'D', text: '21.5 días' },
        ],
        correctOption: 'B',
        explanation: 'El Reglamento para la Aplicación del Código de Trabajo (Reg. 258-93) y la jurisprudencia constante de la SCJ fijan el factor 23.83 para determinar el salario diario ordinario en trabajadores con sueldo mensual.',
        legalBasis: 'Reglamento 258-93 y Jurisprudencia SCJ',
        articleUrl: '/normas/codigo-de-trabajo-ley-16-92/articulo/80',
      },
      {
        id: 'q4',
        questionText: 'El desahucio es un acto que pone término al contrato de trabajo. ¿Para qué tipo de contratos es legalmente aplicable según el Art. 75?',
        options: [
          { id: 'A', text: 'Únicamente para contratos por cierto tiempo' },
          { id: 'B', text: 'Únicamente para contratos para una obra o servicio determinado' },
          { id: 'C', text: 'Para contratos de trabajo por tiempo indefinido' },
          { id: 'D', text: 'Para contratos de pasantía laboral exclusivamente' },
        ],
        correctOption: 'C',
        explanation: 'El Art. 75 estipula que el desahucio solo procede en los contratos por tiempo indefinido, permitiendo a cualquiera de las partes rescindir el contrato sin necesidad de alegar justa causa.',
        legalBasis: 'Artículo 75 del Código de Trabajo',
        articleUrl: '/normas/codigo-de-trabajo-ley-16-92/articulo/75',
      },
    ],
  },
  {
    id: 'garantias-constitucionales',
    title: 'Garantías Constitucionales y Acción de Amparo',
    specialty: 'Derecho Constitucional',
    difficulty: 'Avanzado',
    timeLimitMinutes: 10,
    description: 'Preguntas sobre tutela judicial efectiva, derechos fundamentales y el procedimiento de amparo conforme a la Constitución Dominicana y la Ley 137-11.',
    questions: [
      {
        id: 'c1',
        questionText: '¿Cuál es el plazo legal ordinario para interponer la Acción de Amparo según el Artículo 70 de la Ley 137-11?',
        options: [
          { id: 'A', text: '15 días hábiles' },
          { id: 'B', text: '30 días contados a partir de la fecha en que el agraviado tuvo conocimiento del acto lesivo' },
          { id: 'C', text: '60 días calendarios' },
          { id: 'D', text: 'No prescribe nunca' },
        ],
        correctOption: 'B',
        explanation: 'El Art. 70 de la Ley 137-11 Orgánica del Tribunal Constitucional fija un plazo de caducidad de 30 días continuos desde que el agraviado conoció la vulneración, salvo vulneraciones continuas.',
        legalBasis: 'Artículo 70 de la Ley 137-11',
      },
    ],
  },
];

export function getQuizById(id: string): QuizData | null {
  return DOMINICAN_QUIZZES.find((q) => q.id === id) || null;
}
