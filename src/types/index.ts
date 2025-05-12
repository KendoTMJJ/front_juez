export interface Problem {
    codProblem: string
    title: string
    description: string
    inputFormat: string
    outputFormat: string
    constraints: string[]
    timeLimit: number
    memoryLimit: number
    difficulty: "easy" | "medium" | "hard"
    isPublic: boolean
    tags: string[]
    testCases?: TestCase[]
    createdAt: string
    updatedAt: string
}

export interface TestCase {
    codTestCase: string
    input: string
    expectedOutput: string
    isSample: boolean
    score: number
}

export interface Submission {
    codSubmission: string
    sourceCode: string
    language: string
    languageId?: number
    status:
    | "pending"
    | "evaluating"
    | "accepted"
    | "wrong_answer"
    | "compilation_error"
    | "runtime_error"
    | "time_limit_exceeded"
    | "memory_limit_exceeded"
    | "internal_error"
    judge0Token?: string | null
    result?: any
    executionTime?: number
    memoryUsage?: number
    score?: number
    userId: string
    problem?: Problem
    submittedAt?: string
}
