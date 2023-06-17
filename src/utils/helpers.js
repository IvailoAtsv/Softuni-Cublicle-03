exports.generateDifficultyOptions = (difficultyLevel) => {
    const titles = ['Very Easy', 'Easy', 'Medium (standard 3x3)', 'Intermediate', 'Expert', 'Hardcore']

    const options = titles.map((title, index) => ({
        title: `${index + 1} - ${title}`,
        value: index + 1,
        isSelected: Number(difficultyLevel) === index + 1? 'selected':''
    }))

    return options
}