import type { FamilyRecipe } from "@/content-schema/recipe";

const recipe: FamilyRecipe = {
  slug: "beef-broccoli-stir-fry",
  name: "Beef & broccoli stir-fry",
  emoji: "🥦",
  time: "20 min",
  serves: "Family of 4",
  ingredients: [
    "300 g flank steak, sliced thin against the grain",
    "1 tbsp soy sauce + 1 tsp cornstarch (marinade)",
    "1 large head broccoli, cut into small florets",
    "2 cloves garlic, minced",
    "2 tbsp oyster sauce",
    "60 ml water + 1 tsp cornstarch (sauce)",
    "2 tbsp neutral oil, divided",
    "Steamed rice, to serve",
  ],
  steps: [
    "Toss the beef with the soy sauce and cornstarch; rest 10 minutes while you cut the broccoli.",
    "Blanch the florets 90 seconds in boiling water and drain — this is what keeps them bright and crisp-tender.",
    "Sear the beef in 1 tbsp oil over high heat until just browned, about 2 minutes. Remove.",
    "Fry the garlic in the remaining oil 20 seconds, return the broccoli and beef, and pour in the oyster sauce mixed with the cornstarch water.",
    "Toss 1 minute until the sauce turns glossy and clings. Serve over rice.",
  ],
  whyItWorks:
    "The cornstarch marinade (velveting) keeps cheap beef tender enough for kid molars, and the glossy oyster-sauce glaze makes broccoli the vehicle for something delicious rather than a duty.",
  tips: [
    "Slice the beef against the grain — with the grain is why stir-fry beef turns chewy.",
    "Swap in snap peas or zucchini in the same rhythm: blanch hard vegetables, never soft ones.",
  ],
};

export default recipe;
