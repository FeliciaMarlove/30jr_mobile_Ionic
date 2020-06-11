/**
 * Modèle tâche
 */
export class Task {
    taskId?: number;
    taskName: string;
    taskShortDescription: string;
    taskLongDescription?: string;
    taskActive: boolean;
}
