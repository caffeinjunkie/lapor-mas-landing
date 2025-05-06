export function getSystemPrompt() {
  return {
    role: "system",
    content:
      "You are a helpful e-reporting admin that specializes in verifying reports from users as well as generating follow up questions. You should only receive complaints and negative reports. Positive reports and compliments should be rejected.",
  };
}

export function getUserPrompt(
  title: string,
  description: string,
  category: string,
  address: string,
) {
  return {
    role: "user",
    content: `Verify the title, description, address and category in order to give a priority based on the severity of the problem (LOW | MID | HIGH | CRITICAL), validation score and validation score reason to verify that the report is a valid report or a spam. Give me validity score of 0 to 100 and a short, polite reason("Mohon maaf, ..." if below 80). If the title or descripton has this following context, 1. Sexual Abuse, Kekerasan Seksual, Pelecehan, Pemaksaan Seksual, Sexual Harrasment. 2. Kekerasan Dalam Rumah Tangga(KDRT), Kekerasan Fisik, Kekerasan Pasangan. 3. Legal Dispute, Konflik Warisan, Konflik Properti. 4. Scam, Penipuan Online, Penipuan Belanja, Penipuan Bisnis, Penipuan E-Commerce, Penipuan Sosial Media. 5. Adultery, Perselingkuhan, Affair, Marital Affair, Marital Dispute. 6. Unlawful Termination, PHK, Pemutusan Hubungan Kerja, Pemecatan Sepihak. 7. Mental Disorder, Bunuh Diri, Gangguan Mental, Skizofrenia, Bipolar, Gangguan Jiwa, Gangguan Mental, Gila. 8. Bullying, Perundungan, Dibully, Merundung, Dikerjai, Dianiaya, Dizalimi, Diteror, Dihina, Diejek, Dikucilkan, Disingkirkan, Diskriminasi, Diancam, Dintimidasi, Dipalak, Ditekan, Dikeroyok, Dikata-katai, Diolok-olok, Dilecehkan verbal, Dihina di media sosial, Cyberbullying, Perisakan. Please return the following context as externalIssue with value 1. SEXUAL_ABUSE, 2. KDRT, 3. LEGAL_DISPUTE, 4. SCAM, 5. ADULTERY, 6. UNLAWFUL_TERMINATION, 7. MENTAL_DISORDER, 8. BULLYING, if none of the context reflected this externalIssue, then just return an empty. Then generate maximum of 3 relevant follow up questions, but doesn't have to be 3 especially if the other question would be trivial, do not ask for pictures because it's already included in the report. These are the context to consider: 1. title: ${title}, 2. description: ${description}, 3. category: ${category}, 4. address: ${address}. Address is only relevant if provided, if address is not provided, skip it from the validity checking. If it's a spam, only return isSpam and validationScore. Return the validation score and the follow up questions in JSON format and in bahasa indonesia`,
  };
}

export function getFunctions() {
  return [
    {
      name: "generate_follow_up_question",
      description:
        "Validate user input and generate maximum of 3 follow up questions, based on user input.",
      parameters: {
        type: "object",
        properties: {
          validityScore: {
            type: "number",
            description: "Skor validitas laporan",
          },
          validationScoreReason: {
            type: "string",
            description: "Alasan skor validitas laporan",
          },
          priority: {
            type: "string",
            description: "Prioritas laporan",
          },
          isSpam: {
            type: "boolean",
            description: "Apakah laporan ini adalah spam?",
          },
          externalIssue: {
            type: "string",
            description: "Konteks laporan",
          },
          followUpQuestions: {
            type: "array",
            description: "Pertanyaan follow up",
            items: {
              type: "string",
              description: "Satu pertanyaan follow-up",
            },
          },
        },
        required: [
          "followUpQuestions",
          "validityScore",
          "validationScoreReason",
          "priority",
          "isSpam",
          "externalIssue",
        ],
      },
    },
  ];
}
