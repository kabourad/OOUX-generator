// OOUX Object Template Creator - Figma Plugin
// With AI-powered content suggestions via Gemini API

figma.showUI(__html__, { width: 380, height: 580 });

// ============================================
// OOUX STANDARD COLOR PALETTE
// ============================================
const OOUX_COLORS = {
  // Header - Blue
  header: { r: 0.361, g: 0.58, b: 0.878 }, // #5C94E0
  headerDark: { r: 0.29, g: 0.482, b: 0.78 }, // #4A7BC7

  // Core Content - Orange
  coreContent: { r: 1, g: 0.596, b: 0 }, // #FF9800
  coreContentLight: { r: 1, g: 0.718, b: 0.302 }, // #FFB74D

  // Attributes - Yellow
  attribute: { r: 0.992, g: 0.847, b: 0.208 }, // #FDD835
  attributeLight: { r: 1, g: 0.922, b: 0.231 }, // #FFEB3B

  // Nested Objects - Light Blue
  nestedObject: { r: 0.506, g: 0.831, b: 0.98 }, // #81D4FA
  nestedObjectLight: { r: 0.624, g: 0.878, b: 0.988 }, // #9FE0FC

  // CTAs - Green shades (Primary = darker, Secondary = lighter)
  ctaPrimary: { r: 0.298, g: 0.686, b: 0.314 }, // #4CAF50
  ctaSecondary: { r: 0.647, g: 0.839, b: 0.655 }, // #A5D6A7
  ctaTertiary: { r: 0.784, g: 0.902, b: 0.788 }, // #C8E6C9

  // Neutrals
  white: { r: 1, g: 1, b: 1 },
  textDark: { r: 0.13, g: 0.13, b: 0.13 },
  textMedium: { r: 0.4, g: 0.4, b: 0.4 },
  textLight: { r: 0.6, g: 0.6, b: 0.6 },
  bgLight: { r: 0.97, g: 0.97, b: 0.97 },
  separator: { r: 0.9, g: 0.9, b: 0.9 },
};

// ============================================
// GEMINI API CONFIGURATION
// ============================================
// ⚠️ DO NOT put your real API key here - it will be exposed on GitHub!
// The build script will inject your key from config.ts into the compiled code.js
const GEMINI_API_KEY = "__GEMINI_API_KEY_PLACEHOLDER__";
// Using gemini-2.5-flash - the latest model with good free tier limits
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// ============================================
// SMART LOCAL SUGGESTIONS (Fallback when API unavailable)
// ============================================
const OBJECT_TEMPLATES: Record<string, any> = {
  user: {
    definition:
      "Représente un utilisateur du système avec ses informations personnelles et son profil",
    coreContent: [
      { name: "Photo de profil", value: "👤 Avatar" },
      { name: "Nom complet", value: "Jean Dupont" },
    ],
    attributes: [
      { name: "Email", value: "jean.dupont@email.fr" },
      { name: "Téléphone", value: "06 12 34 56 78" },
      { name: "Date de naissance", value: "15/03/1985" },
      { name: "Adresse", value: "12 Rue de Paris, 75001" },
      { name: "Rôle", value: "Administrateur" },
      { name: "Statut", value: "Actif" },
      { name: "Date d'inscription", value: "01/01/2024" },
      { name: "Dernière connexion", value: "Aujourd'hui 14:30" },
    ],
    nestedObjects: [
      { name: "DOCUMENT", cardinality: "0-many" },
      { name: "COMMANDE", cardinality: "0-many" },
      { name: "NOTIFICATION", cardinality: "0-many" },
      { name: "PRÉFÉRENCE", cardinality: "has 1" },
    ],
    ctas: [
      { label: "Créer un compte", priority: "primary" },
      { label: "Modifier le profil", priority: "primary" },
      { label: "Réinitialiser mot de passe", priority: "secondary" },
      { label: "Désactiver", priority: "secondary" },
      { label: "Supprimer", priority: "tertiary" },
    ],
  },
  utilisateur: {
    definition:
      "Représente un utilisateur du système avec ses informations personnelles et son profil",
    coreContent: ["Photo de profil", "Nom complet"],
    attributes: [
      "Email",
      "Téléphone",
      "Date de naissance",
      "Adresse",
      "Rôle",
      "Statut",
      "Date d'inscription",
      "Dernière connexion",
    ],
    nestedObjects: [
      { name: "DOCUMENT", cardinality: "0-many" },
      { name: "COMMANDE", cardinality: "0-many" },
      { name: "NOTIFICATION", cardinality: "0-many" },
      { name: "PRÉFÉRENCE", cardinality: "has 1" },
    ],
    ctas: [
      { label: "Créer un compte", priority: "primary" },
      { label: "Modifier le profil", priority: "primary" },
      { label: "Réinitialiser mot de passe", priority: "secondary" },
      { label: "Désactiver", priority: "secondary" },
      { label: "Supprimer", priority: "tertiary" },
    ],
  },
  produit: {
    definition:
      "Article ou service disponible à la vente avec ses caractéristiques et prix",
    coreContent: ["Image principale", "Nom du produit", "Prix"],
    attributes: [
      "Référence",
      "Description",
      "Catégorie",
      "Stock",
      "Prix HT",
      "TVA",
      "Poids",
      "Dimensions",
      "Marque",
      "Couleur",
    ],
    nestedObjects: [
      { name: "CATÉGORIE", cardinality: "has 1" },
      { name: "IMAGE", cardinality: "0-many" },
      { name: "AVIS", cardinality: "0-many" },
      { name: "VARIANTE", cardinality: "0-many" },
      { name: "FOURNISSEUR", cardinality: "has 1" },
    ],
    ctas: [
      { label: "Ajouter au panier", priority: "primary" },
      { label: "Acheter maintenant", priority: "primary" },
      { label: "Ajouter aux favoris", priority: "secondary" },
      { label: "Comparer", priority: "secondary" },
      { label: "Partager", priority: "tertiary" },
    ],
  },
  product: {
    definition:
      "Article or service available for sale with its characteristics and pricing",
    coreContent: ["Main image", "Product name", "Price"],
    attributes: [
      "SKU",
      "Description",
      "Category",
      "Stock",
      "Price",
      "Tax",
      "Weight",
      "Dimensions",
      "Brand",
      "Color",
    ],
    nestedObjects: [
      { name: "CATEGORY", cardinality: "has 1" },
      { name: "IMAGE", cardinality: "0-many" },
      { name: "REVIEW", cardinality: "0-many" },
      { name: "VARIANT", cardinality: "0-many" },
      { name: "SUPPLIER", cardinality: "has 1" },
    ],
    ctas: [
      { label: "Add to cart", priority: "primary" },
      { label: "Buy now", priority: "primary" },
      { label: "Add to wishlist", priority: "secondary" },
      { label: "Compare", priority: "secondary" },
      { label: "Share", priority: "tertiary" },
    ],
  },
  commande: {
    definition:
      "Transaction commerciale regroupant les produits achetés par un client",
    coreContent: ["Numéro de commande", "Montant total"],
    attributes: [
      "Date",
      "Statut",
      "Mode de paiement",
      "Adresse livraison",
      "Frais de port",
      "Remise",
      "Notes",
      "Référence",
    ],
    nestedObjects: [
      { name: "CLIENT", cardinality: "has 1" },
      { name: "PRODUIT", cardinality: "1-many" },
      { name: "PAIEMENT", cardinality: "has 1" },
      { name: "LIVRAISON", cardinality: "has 1" },
      { name: "FACTURE", cardinality: "has 1" },
    ],
    ctas: [
      { label: "Valider", priority: "primary" },
      { label: "Modifier", priority: "primary" },
      { label: "Annuler", priority: "secondary" },
      { label: "Rembourser", priority: "secondary" },
      { label: "Imprimer", priority: "tertiary" },
      { label: "Exporter", priority: "tertiary" },
    ],
  },
  order: {
    definition:
      "Commercial transaction grouping products purchased by a customer",
    coreContent: ["Order number", "Total amount"],
    attributes: [
      "Date",
      "Status",
      "Payment method",
      "Shipping address",
      "Shipping cost",
      "Discount",
      "Notes",
      "Reference",
    ],
    nestedObjects: [
      { name: "CUSTOMER", cardinality: "has 1" },
      { name: "PRODUCT", cardinality: "1-many" },
      { name: "PAYMENT", cardinality: "has 1" },
      { name: "DELIVERY", cardinality: "has 1" },
      { name: "INVOICE", cardinality: "has 1" },
    ],
    ctas: [
      { label: "Confirm", priority: "primary" },
      { label: "Edit", priority: "primary" },
      { label: "Cancel", priority: "secondary" },
      { label: "Refund", priority: "secondary" },
      { label: "Print", priority: "tertiary" },
      { label: "Export", priority: "tertiary" },
    ],
  },
  client: {
    definition:
      "Personne ou entreprise ayant une relation commerciale avec la banque",
    coreContent: [
      { name: "Nom complet", value: "Marie Martin" },
      { name: "Numéro client", value: "CLI-2024-00158" },
    ],
    attributes: [
      { name: "Email", value: "m.martin@email.fr" },
      { name: "Téléphone", value: "06 98 76 54 32" },
      { name: "Adresse", value: "45 Avenue des Champs, 75008 Paris" },
      { name: "Date de naissance", value: "22/07/1978" },
      { name: "Profession", value: "Cadre supérieur" },
      { name: "Revenus mensuels", value: "5 200 €" },
      { name: "Scoring", value: "A+" },
      { name: "Segment", value: "Premium" },
      { name: "Conseiller", value: "P. Durand" },
    ],
    nestedObjects: [
      { name: "COMPTE BANCAIRE", cardinality: "1-many" },
      { name: "PRÊT", cardinality: "0-many" },
      { name: "CARTE BANCAIRE", cardinality: "0-many" },
      { name: "CONSEILLER", cardinality: "has 1" },
      { name: "DOCUMENT", cardinality: "0-many" },
    ],
    ctas: [
      { label: "Voir le profil", priority: "primary" },
      { label: "Contacter", priority: "primary" },
      { label: "Nouveau prêt", priority: "secondary" },
      { label: "Historique", priority: "secondary" },
      { label: "Modifier", priority: "tertiary" },
    ],
  },
  intervenant: {
    definition:
      "Personne impliquée dans un processus ou un projet avec un rôle spécifique",
    coreContent: ["Photo", "Nom complet", "Rôle"],
    attributes: [
      "Email",
      "Téléphone",
      "Fonction",
      "Département",
      "Date début",
      "Statut",
      "Compétences",
      "Disponibilité",
    ],
    nestedObjects: [
      { name: "PROJET", cardinality: "0-many" },
      { name: "TÂCHE", cardinality: "0-many" },
      { name: "DOCUMENT", cardinality: "0-many" },
      { name: "ÉQUIPE", cardinality: "has 1" },
    ],
    ctas: [
      { label: "Assigner", priority: "primary" },
      { label: "Contacter", priority: "primary" },
      { label: "Modifier rôle", priority: "secondary" },
      { label: "Retirer", priority: "secondary" },
      { label: "Voir planning", priority: "tertiary" },
    ],
  },
  projet: {
    definition:
      "Ensemble d'activités coordonnées pour atteindre un objectif spécifique",
    coreContent: ["Nom du projet", "Statut"],
    attributes: [
      "Description",
      "Date début",
      "Date fin",
      "Budget",
      "Priorité",
      "Avancement",
      "Chef de projet",
      "Client",
    ],
    nestedObjects: [
      { name: "TÂCHE", cardinality: "1-many" },
      { name: "INTERVENANT", cardinality: "1-many" },
      { name: "DOCUMENT", cardinality: "0-many" },
      { name: "JALON", cardinality: "0-many" },
      { name: "RISQUE", cardinality: "0-many" },
    ],
    ctas: [
      { label: "Créer", priority: "primary" },
      { label: "Modifier", priority: "primary" },
      { label: "Clôturer", priority: "secondary" },
      { label: "Archiver", priority: "secondary" },
      { label: "Exporter rapport", priority: "tertiary" },
    ],
  },
  document: {
    definition: "Fichier ou pièce contenant des informations importantes",
    coreContent: ["Nom du fichier", "Type"],
    attributes: [
      "Taille",
      "Format",
      "Date création",
      "Date modification",
      "Auteur",
      "Version",
      "Statut",
      "Tags",
    ],
    nestedObjects: [
      { name: "DOSSIER", cardinality: "has 1" },
      { name: "VERSION", cardinality: "0-many" },
      { name: "COMMENTAIRE", cardinality: "0-many" },
      { name: "UTILISATEUR", cardinality: "has 1" },
    ],
    ctas: [
      { label: "Télécharger", priority: "primary" },
      { label: "Modifier", priority: "primary" },
      { label: "Partager", priority: "secondary" },
      { label: "Renommer", priority: "secondary" },
      { label: "Supprimer", priority: "tertiary" },
      { label: "Archiver", priority: "tertiary" },
    ],
  },
  pret: {
    definition:
      "Somme d'argent prêtée avec conditions de remboursement définies",
    coreContent: [
      { name: "Numéro de prêt", value: "PRE-2024-001542" },
      { name: "Montant emprunté", value: "250 000 €" },
    ],
    attributes: [
      { name: "Type de prêt", value: "Immobilier" },
      { name: "Taux d'intérêt", value: "3.45%" },
      { name: "Durée", value: "20 ans (240 mois)" },
      { name: "Mensualité", value: "1 456,78 €" },
      { name: "Date de début", value: "01/03/2024" },
      { name: "Date de fin", value: "01/03/2044" },
      { name: "Capital restant dû", value: "248 500 €" },
      { name: "Statut", value: "En cours" },
      { name: "Assurance", value: "CNP - 45€/mois" },
    ],
    nestedObjects: [
      { name: "CLIENT", cardinality: "has 1" },
      { name: "GARANTIE", cardinality: "0-many" },
      { name: "ÉCHÉANCE", cardinality: "1-many" },
      { name: "DOCUMENT", cardinality: "0-many" },
      { name: "ASSURANCE", cardinality: "0-1" },
    ],
    ctas: [
      { label: "Voir échéancier", priority: "primary" },
      { label: "Simuler remboursement", priority: "primary" },
      { label: "Télécharger contrat", priority: "secondary" },
      { label: "Modifier assurance", priority: "secondary" },
      { label: "Contacter conseiller", priority: "tertiary" },
    ],
  },
  demande: {
    definition:
      "Demande de prêt soumise par un client en attente de traitement",
    coreContent: [
      { name: "Numéro demande", value: "DEM-2024-00892" },
      { name: "Type", value: "Prêt immobilier" },
    ],
    attributes: [
      { name: "Montant demandé", value: "320 000 €" },
      { name: "Durée souhaitée", value: "25 ans" },
      { name: "Apport personnel", value: "45 000 €" },
      { name: "Date soumission", value: "10/12/2024" },
      { name: "Statut", value: "En étude" },
      { name: "Client", value: "M. Pierre Lambert" },
      { name: "Conseiller assigné", value: "Sophie Moreau" },
      { name: "Taux proposé", value: "3.25%" },
    ],
    nestedObjects: [
      { name: "CLIENT", cardinality: "has 1" },
      { name: "DOCUMENT", cardinality: "1-many" },
      { name: "GARANTIE", cardinality: "0-many" },
      { name: "SIMULATION", cardinality: "0-many" },
    ],
    ctas: [
      { label: "Étudier le dossier", priority: "primary" },
      { label: "Valider", priority: "primary" },
      { label: "Demander pièces", priority: "secondary" },
      { label: "Refuser", priority: "secondary" },
      { label: "Archiver", priority: "tertiary" },
    ],
  },
};

function getLocalSuggestions(objectName: string): any {
  const key = objectName.toLowerCase().trim();

  // Check for exact match or partial match
  if (OBJECT_TEMPLATES[key]) {
    return OBJECT_TEMPLATES[key];
  }

  // Check for partial matches
  for (const templateKey of Object.keys(OBJECT_TEMPLATES)) {
    if (key.includes(templateKey) || templateKey.includes(key)) {
      return OBJECT_TEMPLATES[templateKey];
    }
  }

  // Return generic template based on common patterns
  return {
    definition: `Objet ${objectName} dans le système`,
    coreContent: [
      {
        name: "Identifiant",
        value: `${objectName.substring(0, 3).toUpperCase()}-2024-00001`,
      },
      { name: "Libellé", value: `${objectName} exemple` },
    ],
    attributes: [
      { name: "Type", value: "Standard" },
      { name: "Statut", value: "Actif" },
      { name: "Date création", value: "15/12/2024" },
      { name: "Date modification", value: "17/12/2024" },
      { name: "Catégorie", value: "Général" },
      { name: "Responsable", value: "Jean Martin" },
      { name: "Priorité", value: "Normale" },
      { name: "Notes", value: "Aucune note" },
    ],
    nestedObjects: [
      { name: "DOCUMENT", cardinality: "0-many" },
      { name: "HISTORIQUE", cardinality: "1-many" },
      { name: "UTILISATEUR", cardinality: "has 1" },
      { name: "COMMENTAIRE", cardinality: "0-many" },
    ],
    ctas: [
      { label: "Créer", priority: "primary" },
      { label: "Modifier", priority: "primary" },
      { label: "Consulter", priority: "secondary" },
      { label: "Supprimer", priority: "secondary" },
      { label: "Archiver", priority: "tertiary" },
      { label: "Exporter", priority: "tertiary" },
    ],
  };
}

// ============================================
// DOMAIN CONTEXT DESCRIPTIONS
// ============================================
const DOMAIN_CONTEXTS: Record<string, string> = {
  banking: `Contexte: Application bancaire (banque, crédit, prêt immobilier, compte bancaire, transactions).
Exemples d'objets typiques: CLIENT, COMPTE, PRÊT, TRANSACTION, CARTE BANCAIRE, VIREMENT, DEMANDE DE CRÉDIT, GARANTIE, CONSEILLER.
Vocabulaire métier: scoring, taux, échéance, mensualité, apport, garantie hypothécaire, assurance emprunteur.`,

  ecommerce: `Contexte: Plateforme e-commerce (vente en ligne, panier, commandes, livraison).
Exemples d'objets typiques: PRODUIT, COMMANDE, PANIER, CLIENT, AVIS, LIVRAISON, PAIEMENT, PROMOTION.
Vocabulaire métier: SKU, stock, prix TTC/HT, frais de port, retour, remboursement.`,

  healthcare: `Contexte: Application de santé (hôpital, clinique, médecin, patient).
Exemples d'objets typiques: PATIENT, MÉDECIN, CONSULTATION, ORDONNANCE, RENDEZ-VOUS, DOSSIER MÉDICAL, EXAMEN.
Vocabulaire métier: diagnostic, traitement, antécédents, prescription, carte vitale.`,

  insurance: `Contexte: Assurance (contrats, sinistres, garanties, cotisations).
Exemples d'objets typiques: CONTRAT, SINISTRE, ASSURÉ, BÉNÉFICIAIRE, GARANTIE, COTISATION, DÉCLARATION.
Vocabulaire métier: prime, franchise, plafond, exclusion, avenant.`,

  realestate: `Contexte: Immobilier (agence, biens, locations, ventes).
Exemples d'objets typiques: BIEN, PROPRIÉTAIRE, LOCATAIRE, MANDAT, VISITE, BAIL, ANNONCE.
Vocabulaire métier: surface, DPE, charges, loyer, compromis, acte authentique.`,

  hr: `Contexte: Ressources humaines (gestion du personnel, recrutement, paie).
Exemples d'objets typiques: EMPLOYÉ, CANDIDAT, CONTRAT DE TRAVAIL, CONGÉ, BULLETIN DE PAIE, ENTRETIEN, FORMATION.
Vocabulaire métier: CDI, CDD, RTT, prime, fiche de poste, période d'essai.`,

  education: `Contexte: Éducation (école, université, formation).
Exemples d'objets typiques: ÉTUDIANT, PROFESSEUR, COURS, EXAMEN, NOTE, INSCRIPTION, DIPLÔME.
Vocabulaire métier: semestre, crédit ECTS, mention, rattrapage, bulletin.`,

  logistics: `Contexte: Logistique et transport (expédition, suivi, entrepôt).
Exemples d'objets typiques: COLIS, EXPÉDITION, TRANSPORTEUR, ENTREPÔT, TOURNÉE, BON DE LIVRAISON.
Vocabulaire métier: tracking, bordereau, palette, picking, zone de stockage.`,

  crm: `Contexte: CRM / Gestion de la relation client (prospects, opportunités, suivi commercial).
Exemples d'objets typiques: CONTACT, ENTREPRISE, OPPORTUNITÉ, DEVIS, TÂCHE, CAMPAGNE, PIPELINE.
Vocabulaire métier: lead, prospect, closing, forecast, funnel, scoring.`,

  generic: `Contexte: Application générique.`,
};

// ============================================
// AI SUGGESTION FUNCTION (with smart fallback)
// ============================================
async function getAISuggestions(
  objectName: string,
  domainContext: string = "generic"
): Promise<any> {
  const domainInfo = DOMAIN_CONTEXTS[domainContext] || DOMAIN_CONTEXTS.generic;

  const prompt = `Tu es un expert en OOUX (Object-Oriented UX) et en conception de systèmes d'information.

${domainInfo}

Pour l'objet "${objectName}", génère une structure OOUX avec des EXEMPLES DE VALEURS RÉALISTES.

IMPORTANT:
- Chaque attribut doit avoir un NOM et une VALEUR D'EXEMPLE réaliste
- Le coreContent doit avoir des valeurs d'exemple qui identifient l'objet
- Les CTAs doivent être des actions utilisateur concrètes

Réponds UNIQUEMENT en JSON valide avec cette structure exacte:
{
  "definition": "Définition métier précise en 1 phrase",
  "coreContent": [
    {"name": "Nom du champ", "value": "Valeur d'exemple réaliste"},
    {"name": "Autre champ", "value": "Autre exemple"}
  ],
  "attributes": [
    {"name": "Nom attribut 1", "value": "Exemple valeur 1"},
    {"name": "Nom attribut 2", "value": "Exemple valeur 2"},
    {"name": "Email", "value": "exemple@email.com"},
    {"name": "Téléphone", "value": "06 12 34 56 78"},
    {"name": "Date", "value": "15/03/2024"},
    {"name": "Montant", "value": "150 000 €"}
  ],
  "nestedObjects": [
    {"name": "OBJET_LIÉ_1", "cardinality": "1-many"},
    {"name": "OBJET_LIÉ_2", "cardinality": "has 1"}
  ],
  "ctas": [
    {"label": "Action principale", "priority": "primary"},
    {"label": "Action secondaire", "priority": "secondary"},
    {"label": "Action tertiaire", "priority": "tertiary"}
  ]
}

EXEMPLES de valeurs selon le contexte:
- Pour un CLIENT bancaire: "Nom": "Martin Dupont", "Email": "m.dupont@email.fr", "Scoring": "A+"
- Pour un PRÊT: "Montant": "250 000 €", "Taux": "3.5%", "Durée": "20 ans"
- Pour une COMMANDE: "Référence": "CMD-2024-001", "Total": "89.99 €"

Cardinalités: "has 1", "0-1", "1-many", "0-many"

TOUS les labels en FRANÇAIS. JSON uniquement, pas de markdown.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      // If API fails (rate limit, etc.), use smart local fallback
      console.log("API unavailable, using smart local suggestions");
      return { ...getLocalSuggestions(objectName), source: "local" };
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      // Use local fallback if no response
      console.log("No AI response, using smart local suggestions");
      return { ...getLocalSuggestions(objectName), source: "local" };
    }

    // Parse JSON from response (handle potential markdown code blocks)
    let jsonStr = textResponse;
    if (jsonStr.includes("```json")) {
      jsonStr = jsonStr.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonStr.includes("```")) {
      jsonStr = jsonStr.replace(/```\n?/g, "");
    }

    const result = JSON.parse(jsonStr.trim());
    return { ...result, source: "ai" };
  } catch (error: any) {
    console.error("AI Suggestion Error:", error);
    // Always fall back to local suggestions on any error
    console.log("Error occurred, using smart local suggestions");
    return { ...getLocalSuggestions(objectName), source: "local" };
  }
}

// ============================================
// DEFAULT CONTENT (fallback if AI not used)
// ============================================
const DEFAULT_CORE_CONTENT = ["Icon", "Nom principal"];
const DEFAULT_ATTRS = [
  "Identifiant",
  "Type",
  "Statut",
  "Date création",
  "Date modification",
  "Description",
  "Catégorie",
  "Tags",
  "Propriétaire",
  "Version",
  "Priorité",
  "Notes",
];
const DEFAULT_NESTED = [
  { name: "DOCUMENT", cardinality: "0-many" },
  { name: "COMMENTAIRE", cardinality: "0-many" },
  { name: "HISTORIQUE", cardinality: "1-many" },
  { name: "UTILISATEUR", cardinality: "has 1" },
  { name: "NOTIFICATION", cardinality: "0-many" },
  { name: "PIÈCE JOINTE", cardinality: "0-many" },
];
const DEFAULT_CTAS = [
  { label: "Créer", priority: "primary" },
  { label: "Modifier", priority: "primary" },
  { label: "Consulter", priority: "primary" },
  { label: "Supprimer", priority: "secondary" },
  { label: "Dupliquer", priority: "secondary" },
  { label: "Archiver", priority: "tertiary" },
  { label: "Exporter", priority: "tertiary" },
  { label: "Partager", priority: "tertiary" },
];

// ============================================
// MAIN MESSAGE HANDLER
// ============================================
figma.ui.onmessage = async (msg) => {
  console.log("Message received:", msg);

  if (msg.type === "cancel") {
    figma.closePlugin();
    return;
  }

  // Handle AI suggestion request
  if (msg.type === "ai-suggest") {
    try {
      const suggestions = await getAISuggestions(
        msg.objectName,
        msg.domainContext || "generic"
      );
      figma.ui.postMessage({
        type: "ai-response",
        suggestions: suggestions,
      });
    } catch (error: any) {
      figma.ui.postMessage({
        type: "ai-response",
        error: error.message || "Failed to get AI suggestions",
      });
    }
    return;
  }

  if (msg.type === "generate") {
    console.log("Starting generation...");

    try {
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      await figma.loadFontAsync({ family: "Inter", style: "Medium" });
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });
      console.log("Fonts loaded");
    } catch (e) {
      console.log("Font error, continuing anyway");
    }

    const W = 280;
    const objectName = msg.objectName || "OBJECT";
    const objectDef = msg.objectDef || "Description de l'objet...";
    const stage = msg.stage || "tout le long";
    const attrCount = msg.attrCount || 8;
    const relCount = msg.relCount || 5;
    const ctaCount = msg.ctaCount || 6;

    // Use AI suggestions or defaults
    const ai = msg.aiSuggestions;
    const coreContent = ai?.coreContent || DEFAULT_CORE_CONTENT;
    const attributes = ai?.attributes || DEFAULT_ATTRS;
    const nestedObjects = ai?.nestedObjects || DEFAULT_NESTED;
    const ctas = ai?.ctas || DEFAULT_CTAS;
    const definition = ai?.definition || objectDef;

    // Create main frame
    const frame = figma.createFrame();
    frame.name = objectName;
    frame.resize(W, 800);
    frame.fills = [{ type: "SOLID", color: OOUX_COLORS.white }];
    frame.cornerRadius = 8;
    frame.effects = [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 2 },
        radius: 8,
        spread: 0,
        visible: true,
        blendMode: "NORMAL",
      },
    ];

    let y = 0;

    // ============================================
    // HEADER SECTION (Blue)
    // ============================================
    const headerBg = figma.createRectangle();
    headerBg.resize(W, 56);
    headerBg.x = 0;
    headerBg.y = 0;
    headerBg.fills = [{ type: "SOLID", color: OOUX_COLORS.header }];
    headerBg.topLeftRadius = 8;
    headerBg.topRightRadius = 8;
    frame.appendChild(headerBg);

    // Stage label
    const stageText = figma.createText();
    stageText.x = 14;
    stageText.y = 10;
    stageText.fontSize = 9;
    stageText.characters = "Étape: " + stage;
    stageText.fills = [{ type: "SOLID", color: OOUX_COLORS.white }];
    stageText.opacity = 0.85;
    frame.appendChild(stageText);

    // Object title
    const titleText = figma.createText();
    titleText.x = 14;
    titleText.y = 28;
    titleText.fontSize = 18;
    titleText.fontName = { family: "Inter", style: "Bold" };
    titleText.characters = objectName.toUpperCase();
    titleText.fills = [{ type: "SOLID", color: OOUX_COLORS.white }];
    frame.appendChild(titleText);

    y = 64;

    // Definition section
    const defLabel = figma.createText();
    defLabel.x = 14;
    defLabel.y = y;
    defLabel.fontSize = 8;
    defLabel.fontName = { family: "Inter", style: "Medium" };
    defLabel.characters = "DÉFINITION";
    defLabel.fills = [{ type: "SOLID", color: OOUX_COLORS.textLight }];
    defLabel.letterSpacing = { value: 1, unit: "PIXELS" };
    frame.appendChild(defLabel);

    y += 14;

    const defText = figma.createText();
    defText.x = 14;
    defText.y = y;
    defText.fontSize = 10;
    defText.characters = definition;
    defText.fills = [{ type: "SOLID", color: OOUX_COLORS.textMedium }];
    defText.resize(W - 28, defText.height);
    defText.textAutoResize = "HEIGHT";
    frame.appendChild(defText);

    y += defText.height + 16;

    // Separator
    const sep1 = figma.createRectangle();
    sep1.resize(W - 28, 1);
    sep1.x = 14;
    sep1.y = y;
    sep1.fills = [{ type: "SOLID", color: OOUX_COLORS.separator }];
    frame.appendChild(sep1);

    y += 12;

    // ============================================
    // CORE CONTENT SECTION (Orange)
    // ============================================
    const coreLabel = figma.createText();
    coreLabel.x = 14;
    coreLabel.y = y;
    coreLabel.fontSize = 8;
    coreLabel.fontName = { family: "Inter", style: "Bold" };
    coreLabel.characters = "CORE CONTENT";
    coreLabel.fills = [{ type: "SOLID", color: OOUX_COLORS.coreContent }];
    coreLabel.letterSpacing = { value: 1, unit: "PIXELS" };
    frame.appendChild(coreLabel);

    y += 16;

    // Core content items (Orange background)
    for (let i = 0; i < Math.min(coreContent.length, 3); i++) {
      const rowBg = figma.createRectangle();
      rowBg.resize(W - 28, 44);
      rowBg.x = 14;
      rowBg.y = y;
      rowBg.cornerRadius = 4;
      rowBg.fills = [{ type: "SOLID", color: OOUX_COLORS.coreContent }];
      frame.appendChild(rowBg);

      // Content name (label)
      const contentName = figma.createText();
      contentName.x = 22;
      contentName.y = y + 6;
      contentName.fontSize = 9;
      contentName.fontName = { family: "Inter", style: "Medium" };
      contentName.characters =
        typeof coreContent[i] === "string"
          ? coreContent[i]
          : coreContent[i].name || "Content";
      contentName.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
      contentName.opacity = 0.8;
      frame.appendChild(contentName);

      // Content value (example)
      const contentValue = figma.createText();
      contentValue.x = 22;
      contentValue.y = y + 22;
      contentValue.fontSize = 12;
      contentValue.fontName = { family: "Inter", style: "Bold" };
      const coreValue =
        typeof coreContent[i] === "string"
          ? "Exemple..."
          : coreContent[i].value || "Exemple...";
      contentValue.characters = coreValue;
      contentValue.fills = [{ type: "SOLID", color: OOUX_COLORS.white }];
      frame.appendChild(contentValue);

      y += 48;
    }

    y += 8;

    // ============================================
    // ATTRIBUTES SECTION (Yellow)
    // ============================================
    const attrLabel = figma.createText();
    attrLabel.x = 14;
    attrLabel.y = y;
    attrLabel.fontSize = 8;
    attrLabel.fontName = { family: "Inter", style: "Bold" };
    attrLabel.characters = "ATTRIBUTES";
    attrLabel.fills = [{ type: "SOLID", color: OOUX_COLORS.attribute }];
    attrLabel.letterSpacing = { value: 1, unit: "PIXELS" };
    frame.appendChild(attrLabel);

    y += 16;

    const SIZES = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
    const usedAttrs = attributes.slice(0, attrCount);

    for (let i = 0; i < usedAttrs.length; i++) {
      const rowBg = figma.createRectangle();
      rowBg.resize(W - 28, 36);
      rowBg.x = 14;
      rowBg.y = y;
      rowBg.cornerRadius = 4;
      rowBg.fills = [{ type: "SOLID", color: OOUX_COLORS.attribute }];
      frame.appendChild(rowBg);

      const attrName = figma.createText();
      attrName.x = 22;
      attrName.y = y + 6;
      attrName.fontSize = 10;
      attrName.fontName = { family: "Inter", style: "Medium" };
      attrName.characters =
        typeof usedAttrs[i] === "string"
          ? usedAttrs[i]
          : usedAttrs[i].name || "Attribute";
      attrName.fills = [{ type: "SOLID", color: OOUX_COLORS.textDark }];
      frame.appendChild(attrName);

      const attrVal = figma.createText();
      attrVal.x = 22;
      attrVal.y = y + 20;
      attrVal.fontSize = 9;
      // Use actual value from AI suggestions if available
      const attrValue =
        typeof usedAttrs[i] === "string"
          ? "valeur..."
          : usedAttrs[i].value || "valeur...";
      attrVal.characters = attrValue;
      attrVal.fills = [{ type: "SOLID", color: OOUX_COLORS.textMedium }];
      frame.appendChild(attrVal);

      // Size indicator
      const sizeText = figma.createText();
      sizeText.x = W - 40;
      sizeText.y = y + 6;
      sizeText.fontSize = 7;
      sizeText.fontName = { family: "Inter", style: "Medium" };
      sizeText.characters = SIZES[Math.min(i, SIZES.length - 1)];
      sizeText.fills = [{ type: "SOLID", color: OOUX_COLORS.textMedium }];
      frame.appendChild(sizeText);

      y += 40;
    }

    y += 12;

    // ============================================
    // NESTED OBJECTS SECTION (Light Blue)
    // ============================================
    const nestedLabel = figma.createText();
    nestedLabel.x = 14;
    nestedLabel.y = y;
    nestedLabel.fontSize = 8;
    nestedLabel.fontName = { family: "Inter", style: "Bold" };
    nestedLabel.characters = "NESTED OBJECTS";
    nestedLabel.fills = [{ type: "SOLID", color: OOUX_COLORS.nestedObject }];
    nestedLabel.letterSpacing = { value: 1, unit: "PIXELS" };
    frame.appendChild(nestedLabel);

    y += 16;

    const usedNested = nestedObjects.slice(0, relCount);

    for (let i = 0; i < usedNested.length; i++) {
      const rel = usedNested[i];
      const relName = typeof rel === "string" ? rel : rel.name || "OBJECT";
      const cardinality =
        typeof rel === "string" ? "0-many" : rel.cardinality || "0-many";

      // Cardinality badge
      const cardBg = figma.createRectangle();
      cardBg.resize(50, 18);
      cardBg.x = 14;
      cardBg.y = y;
      cardBg.cornerRadius = 3;
      cardBg.fills = [{ type: "SOLID", color: OOUX_COLORS.nestedObjectLight }];
      frame.appendChild(cardBg);

      const cardText = figma.createText();
      cardText.x = 18;
      cardText.y = y + 4;
      cardText.fontSize = 8;
      cardText.fontName = { family: "Inter", style: "Medium" };
      cardText.characters = cardinality;
      cardText.fills = [{ type: "SOLID", color: OOUX_COLORS.textDark }];
      frame.appendChild(cardText);

      // "related" label
      const relatedText = figma.createText();
      relatedText.x = 70;
      relatedText.y = y + 4;
      relatedText.fontSize = 8;
      relatedText.characters = "related";
      relatedText.fills = [{ type: "SOLID", color: OOUX_COLORS.textLight }];
      frame.appendChild(relatedText);

      // Object name badge (Light Blue)
      const objBg = figma.createRectangle();
      objBg.resize(W - 126, 18);
      objBg.x = 112;
      objBg.y = y;
      objBg.cornerRadius = 3;
      objBg.fills = [{ type: "SOLID", color: OOUX_COLORS.nestedObject }];
      frame.appendChild(objBg);

      const objText = figma.createText();
      objText.x = 118;
      objText.y = y + 4;
      objText.fontSize = 8;
      objText.fontName = { family: "Inter", style: "Medium" };
      objText.characters = relName.toUpperCase();
      objText.fills = [{ type: "SOLID", color: OOUX_COLORS.white }];
      frame.appendChild(objText);

      y += 24;
    }

    y += 12;

    // ============================================
    // CTAs SECTION (Green shades)
    // ============================================
    const ctaHdrBg = figma.createRectangle();
    ctaHdrBg.resize(W, 26);
    ctaHdrBg.x = 0;
    ctaHdrBg.y = y;
    ctaHdrBg.fills = [{ type: "SOLID", color: OOUX_COLORS.bgLight }];
    frame.appendChild(ctaHdrBg);

    const ctaHdrText = figma.createText();
    ctaHdrText.x = 14;
    ctaHdrText.y = y + 7;
    ctaHdrText.fontSize = 10;
    ctaHdrText.fontName = { family: "Inter", style: "Bold" };
    ctaHdrText.characters = "CALLS TO ACTION";
    ctaHdrText.fills = [{ type: "SOLID", color: OOUX_COLORS.ctaPrimary }];
    frame.appendChild(ctaHdrText);

    y += 32;

    const usedCtas = ctas.slice(0, ctaCount);

    for (let i = 0; i < usedCtas.length; i++) {
      const cta = usedCtas[i];
      const ctaLabel = typeof cta === "string" ? cta : cta.label || "Action";
      const priority =
        typeof cta === "string"
          ? i < 2
            ? "primary"
            : i < 4
            ? "secondary"
            : "tertiary"
          : cta.priority || "tertiary";

      // Choose color based on priority
      let ctaColor = OOUX_COLORS.ctaTertiary;
      if (priority === "primary") ctaColor = OOUX_COLORS.ctaPrimary;
      else if (priority === "secondary") ctaColor = OOUX_COLORS.ctaSecondary;

      const ctaBg = figma.createRectangle();
      ctaBg.resize(W - 28, 28);
      ctaBg.x = 14;
      ctaBg.y = y;
      ctaBg.cornerRadius = 4;
      ctaBg.fills = [{ type: "SOLID", color: ctaColor }];
      frame.appendChild(ctaBg);

      const ctaText = figma.createText();
      ctaText.x = 22;
      ctaText.y = y + 8;
      ctaText.fontSize = 10;
      ctaText.fontName = { family: "Inter", style: "Medium" };
      ctaText.characters = ctaLabel;
      ctaText.fills = [
        {
          type: "SOLID",
          color:
            priority === "primary" ? OOUX_COLORS.white : OOUX_COLORS.textDark,
        },
      ];
      frame.appendChild(ctaText);

      // Priority indicator
      const priorityText = figma.createText();
      priorityText.x = W - 55;
      priorityText.y = y + 9;
      priorityText.fontSize = 7;
      priorityText.characters = priority.toUpperCase();
      priorityText.fills = [
        {
          type: "SOLID",
          color:
            priority === "primary"
              ? { r: 1, g: 1, b: 1 }
              : OOUX_COLORS.textMedium,
        },
      ];
      priorityText.opacity = 0.7;
      frame.appendChild(priorityText);

      y += 32;
    }

    y += 16;

    // ============================================
    // FINALIZE
    // ============================================

    // Resize frame to content
    frame.resize(W, y);

    // Position in center of viewport
    frame.x = figma.viewport.center.x - W / 2;
    frame.y = figma.viewport.center.y - y / 2;

    // Select and zoom to frame
    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);

    console.log("OOUX Template created!");
    figma.notify("✓ OOUX Template created with proper colors!");
    figma.closePlugin();
  }
};
