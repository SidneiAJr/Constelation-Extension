// templates/TemplateJava.ts
import * as fs from 'fs';
import * as path from 'path';

export async function generateSparkProject(projectPath: string, projectName: string) {
    
    // pom.xml
    const pomXml = `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>${projectName}</artifactId>
    <version>1.0.0</version>
    
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>com.sparkjava</groupId>
            <artifactId>spark-core</artifactId>
            <version>2.9.4</version>
        </dependency>
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <version>8.0.33</version>
        </dependency>
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>2.10.1</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.mindrot</groupId>
            <artifactId>jbcrypt</artifactId>
            <version>0.4</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>1.7.36</version>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.11.0</version>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>`;
    fs.writeFileSync(path.join(projectPath, 'pom.xml'), pomXml);

    // Main.java (Spark Java entry point)
    const main = `package com.example;

import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        port(8080);
        
        get("/", (req, res) -> {
            res.type("application/json");
            return "{\"message\": \"API rodando!\"}";
        });
    }
}`;
    const mainPath = path.join(projectPath, 'src/main/java/com/example');
    fs.mkdirSync(mainPath, { recursive: true });
    fs.writeFileSync(path.join(mainPath, 'Main.java'), main);

    // .env
    const env = `DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=meu_banco
JWT_SECRET=`;
    fs.writeFileSync(path.join(projectPath, '.env'), env);
    fs.writeFileSync(path.join(projectPath, '.env.example'), env);

    // .gitignore
    const gitignore = `target/
.classpath
.project
.settings/
.env
*.log`;
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

    // Dockerfile
    const dockerfile = `FROM openjdk:17-slim
WORKDIR /app
COPY . .
RUN mvn clean package
EXPOSE 8080
CMD ["java", "-jar", "target/${projectName}-1.0.0.jar"]`;
    fs.writeFileSync(path.join(projectPath, 'Dockerfile'), dockerfile);

    // README.md
    const readme = `# ${projectName}

## Backend Spark Java

### Rodar
\`\`\`bash
mvn clean compile exec:java
\`\`\`

### Docker
\`\`\`bash
docker build -t ${projectName} .
docker run -p 8080:8080 ${projectName}
\`\`\`

---
Gerado com Constellation CLI
`;
    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
}