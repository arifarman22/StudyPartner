<<<<<<< HEAD
import os

# Define the folder structure
structure = {
    "student-toolkit": {
        "backend": {
            "app": {
                "__init__.py": "",
                "main.py": "",
                "database.py": "",
                "models.py": "",
                "schemas.py": "",
                "auth.py": "",
                "ai_agent.py": "",
                "email_service.py": "",
                "routes": {
                    "__init__.py": "",
                    "auth.py": "",
                    "syllabus.py": "",
                    "materials.py": "",
                    "schedule.py": "",
                    "notifications.py": "",
                },
            },
            "requirements.txt": "",
            ".env": "",
            "Dockerfile": "",
            "uploads": {
                ".gitkeep": "",
            },
        },
        "frontend": {
            "public": {
                "index.html": "",
                "favicon.ico": "",
            },
            "src": {
                "components": {
                    "Layout": {
                        "Navbar.jsx": "",
                        "Sidebar.jsx": "",
                        "ThreeDBackground.jsx": "",
                    },
                    "Auth": {
                        "Login.jsx": "",
                        "GoogleLoginButton.jsx": "",
                    },
                    "Dashboard": {
                        "Dashboard.jsx": "",
                        "Stats.jsx": "",
                    },
                    "Syllabus": {
                        "SyllabusManager.jsx": "",
                        "SyllabusItem.jsx": "",
                    },
                    "Materials": {
                        "MaterialsManager.jsx": "",
                        "MaterialUpload.jsx": "",
                    },
                    "Schedule": {
                        "ScheduleView.jsx": "",
                        "Calendar.jsx": "",
                    },
                    "AIAgent": {
                        "AgentInterface.jsx": "",
                    },
                },
                "hooks": {
                    "useAuth.js": "",
                    "useApi.js": "",
                },
                "styles": {
                    "index.css": "",
                    "animations.css": "",
                    "theme.css": "",
                },
                "utils": {
                    "api.js": "",
                    "auth.js": "",
                },
                "App.jsx": "",
                "App.css": "",
                "index.js": "",
            },
            "package.json": "",
            "vite.config.js": "",
            "tailwind.config.js": "",
            ".env": "",
            "Dockerfile": "",
        },
        "database": {
            "init.sql": "",
        },
        "nginx": {
            "nginx.conf": "",
        },
        "docker-compose.yml": "",
        ".gitignore": "",
        "README.md": "",
        "setup.py": "",
    }
}


def create_structure(base_path, structure_dict):
    for name, content in structure_dict.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            # Create directory
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            # Create file
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)


if __name__ == "__main__":
    create_structure(".", structure)
    print("✅ Project structure created successfully!")
=======
import os

# Define the folder structure
structure = {
    "student-toolkit": {
        "backend": {
            "app": {
                "__init__.py": "",
                "main.py": "",
                "database.py": "",
                "models.py": "",
                "schemas.py": "",
                "auth.py": "",
                "ai_agent.py": "",
                "email_service.py": "",
                "routes": {
                    "__init__.py": "",
                    "auth.py": "",
                    "syllabus.py": "",
                    "materials.py": "",
                    "schedule.py": "",
                    "notifications.py": "",
                },
            },
            "requirements.txt": "",
            ".env": "",
            "Dockerfile": "",
            "uploads": {
                ".gitkeep": "",
            },
        },
        "frontend": {
            "public": {
                "index.html": "",
                "favicon.ico": "",
            },
            "src": {
                "components": {
                    "Layout": {
                        "Navbar.jsx": "",
                        "Sidebar.jsx": "",
                        "ThreeDBackground.jsx": "",
                    },
                    "Auth": {
                        "Login.jsx": "",
                        "GoogleLoginButton.jsx": "",
                    },
                    "Dashboard": {
                        "Dashboard.jsx": "",
                        "Stats.jsx": "",
                    },
                    "Syllabus": {
                        "SyllabusManager.jsx": "",
                        "SyllabusItem.jsx": "",
                    },
                    "Materials": {
                        "MaterialsManager.jsx": "",
                        "MaterialUpload.jsx": "",
                    },
                    "Schedule": {
                        "ScheduleView.jsx": "",
                        "Calendar.jsx": "",
                    },
                    "AIAgent": {
                        "AgentInterface.jsx": "",
                    },
                },
                "hooks": {
                    "useAuth.js": "",
                    "useApi.js": "",
                },
                "styles": {
                    "index.css": "",
                    "animations.css": "",
                    "theme.css": "",
                },
                "utils": {
                    "api.js": "",
                    "auth.js": "",
                },
                "App.jsx": "",
                "App.css": "",
                "index.js": "",
            },
            "package.json": "",
            "vite.config.js": "",
            "tailwind.config.js": "",
            ".env": "",
            "Dockerfile": "",
        },
        "database": {
            "init.sql": "",
        },
        "nginx": {
            "nginx.conf": "",
        },
        "docker-compose.yml": "",
        ".gitignore": "",
        "README.md": "",
        "setup.py": "",
    }
}


def create_structure(base_path, structure_dict):
    for name, content in structure_dict.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            # Create directory
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            # Create file
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)


if __name__ == "__main__":
    create_structure(".", structure)
    print("✅ Project structure created successfully!")
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
