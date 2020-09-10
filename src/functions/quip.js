const quipList = [
    `Time to get started on that email!`,
    `Let's power through that writer's block.`,
    `It's a good time to start that blog post you've been thinking about.`,
    `Why not tackle that essay intro you've been putting off?`,
    `Your work means nothing if you don't get started.`
]

export function quip() {
    return quipList[Math.floor(Math.random() * quipList.length)]
}