from http.server import HTTPServer, BaseHTTPRequestHandler
import functions
import json

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        match self.path:
            case "/health":
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"Hi, I'm Nanny, I'm here to help you organize!\n(list - for listing tasks)\n(add <task> - for adding a task)\n(done <task> - for setting a task as done)\n(delete <task> - to deleting a task)\n(exit - to exit program)")
            case "/list":
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps(functions.loadTasks()).encode())
            case _:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(b"Error: path not found")

server = HTTPServer(("localhost", 6969), Handler)
server.serve_forever()
