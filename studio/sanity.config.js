import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";

export default defineConfig({
    title: "rominagarbar",
    projectId: "hic407cy",
    dataset: "production",
    plugins: [
        deskTool({
            structure: deskStructure
        })
    ],
    schema: {
        types: schemas,
    },
})
