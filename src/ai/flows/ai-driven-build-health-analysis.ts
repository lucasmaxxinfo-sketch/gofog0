'use server';
/**
 * @fileOverview This file implements a Genkit flow for AI-driven build health analysis of Capacitor projects.
 *
 * - aiDrivenBuildHealthAnalysis - A function that analyzes the Capacitor project state and build logs.
 * - AIDrivenBuildHealthAnalysisInput - The input type for the aiDrivenBuildHealthAnalysis function.
 * - AIDrivenBuildHealthAnalysisOutput - The return type for the aiDrivenBuildHealthAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIDrivenBuildHealthAnalysisInputSchema = z.object({
  capacitorConfigContent: z
    .string()
    .describe('Content of capacitor.config.ts or capacitor.config.json.'),
  packageJsonContent: z.string().describe('Content of package.json.'),
  androidFolderExists: z.boolean().describe('Whether the android/ folder exists.'),
  androidProjectDetails: z
    .string()
    .describe(
      'Details about the Android project, including inferred package name, application ID, minimum SDK version, target SDK version, and build commands used. Format: "Package Name: <name>, Application ID: <id>, Min SDK: <min>, Target SDK: <target>, Build Commands: <commands>."'
    ),
  buildLogs: z
    .string()
    .describe('Recent and relevant build logs from an attempt to build the Capacitor Android project.'),
  knownIssues: z
    .string()
    .optional()
    .describe('Any known, pre-existing issues or additional context about the project environment.'),
  modifiedFiles: z
    .array(z.string())
    .describe('List of files created or modified for Capacitor support within the project.'),
  capacitorVersion: z.string().describe('The installed Capacitor version detected in package.json.'),
});
export type AIDrivenBuildHealthAnalysisInput = z.infer<typeof AIDrivenBuildHealthAnalysisInputSchema>;

const AIDrivenBuildHealthAnalysisOutputSchema = z.object({
  canGenerateAPK: z
    .boolean()
    .describe(
      'True if an APK can be generated successfully without additional code changes or manual interventions, false otherwise.'
    ),
  identifiedBlockers: z
    .array(z.string())
    .describe('A list of specific build blockers or potential issues found.'),
  recommendations: z
    .array(z.string())
    .describe('Actionable recommendations to resolve the identified issues.'),
  aiReasoning: z
    .string()
    .describe(
      'A detailed explanation of the AI\'s analysis, including how it arrived at its conclusions for build health.'
    ),
});
export type AIDrivenBuildHealthAnalysisOutput = z.infer<typeof AIDrivenBuildHealthAnalysisOutputSchema>;

export async function aiDrivenBuildHealthAnalysis(
  input: AIDrivenBuildHealthAnalysisInput
): Promise<AIDrivenBuildHealthAnalysisOutput> {
  return aiDrivenBuildHealthAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiDrivenBuildHealthAnalysisPrompt',
  input: {schema: AIDrivenBuildHealthAnalysisInputSchema},
  output: {schema: AIDrivenBuildHealthAnalysisOutputSchema},
  prompt: `You are an expert Capacitor and Android build engineer. Your task is to analyze the provided Capacitor project information and build logs to determine its build health and readiness for APK generation.\n\nCarefully examine all provided information:\n- Capacitor Configuration: {{{capacitorConfigContent}}}\n- package.json Content: {{{packageJsonContent}}}\n- Android Folder Exists: {{{androidFolderExists}}}\n- Android Project Details: {{{androidProjectDetails}}}\n- Build Logs: {{{buildLogs}}}\n- Known Issues (if any): {{{knownIssues}}}\n- Modified/Created Files for Capacitor: {{{modifiedFiles}}}\n- Capacitor Version: {{{capacitorVersion}}}\n\nBased on this information, provide a detailed assessment.\n1. Determine if an APK can be generated successfully without additional code changes or manual interventions.\n2. Identify any specific build blockers or potential issues that prevent successful APK generation.\n3. Provide clear, actionable recommendations to resolve each identified issue.\n4. Explain your reasoning comprehensively, referencing the input data where applicable.\n\nEnsure your output strictly adheres to the provided JSON schema for AIDrivenBuildHealthAnalysisOutput.`,
});

const aiDrivenBuildHealthAnalysisFlow = ai.defineFlow(
  {
    name: 'aiDrivenBuildHealthAnalysisFlow',
    inputSchema: AIDrivenBuildHealthAnalysisInputSchema,
    outputSchema: AIDrivenBuildHealthAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);