export const jsonToLogicalString = (jsonData, indent = 0) => {
    let logicalString = "";
    const indentation = "  ".repeat(indent);

    for (const key in jsonData) {
        if (Array.isArray(jsonData[key])) {
            logicalString += `${indentation}${key}:\n`;
            jsonData[key].forEach(item => {
                logicalString += jsonToLogicalString(item, indent + 1);
            });
        } else if (typeof jsonData[key] === 'object' && jsonData[key] !== null) {
            logicalString += `${indentation}${key}:\n`;
            logicalString += jsonToLogicalString(jsonData[key], indent + 1);
        } else {
            logicalString += `${indentation}${key}: ${jsonData[key]}\n`;
        }
    }

    return logicalString;
};