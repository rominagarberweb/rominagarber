import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./schemas/schema";
import deskStructure from "./deskStructure";
import { colorInput } from "@sanity/color-input";

export default defineConfig({
    title: "rominagarbar",
    projectId: "hic407cy",
    dataset: "production",
    plugins: [
        deskTool({
            structure: deskStructure
        }),
        colorInput()
    ],
    schema: {
        types: schemas,
    },
})
