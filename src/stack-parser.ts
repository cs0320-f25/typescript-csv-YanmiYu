import { z } from 'zod';

export function createStackSchema<T>(elementSchema: z.ZodType<T>) {
  return z.object({
    // Stack elements stored in an array
    elements: z.array(elementSchema),
    metadata: z.object({
      maxSize: z.number().int().positive().optional(),
      name: z.string().optional(),
      createdAt: z.date().optional().or(z.string().datetime()),
    }).optional(),
  }).transform(data => {
    return {
      ...data,
      size: data.elements.length,
      isEmpty: data.elements.length === 0,
      // Add stack methods (these would be actual functions in a real implementation)
      peek: () => data.elements.length > 0 ? data.elements[data.elements.length - 1] : undefined,
      // Note: actual push/pop methods would mutate the stack, but since Zod transformations
      // should be pure functions, just demonstrating the concept here
    };
  });
}

// Example usage with a specific element type
const NumberStackSchema = createStackSchema(z.number());
type NumberStack = z.infer<typeof NumberStackSchema>;

// Example usage with a complex element type
const TaskSchema = z.object({
  id: z.string().uuid(),
  description: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
  completed: z.boolean().default(false),
});

const TaskStackSchema = createStackSchema(TaskSchema);
type TaskStack = z.infer<typeof TaskStackSchema>;