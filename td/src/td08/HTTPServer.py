import cgi
import sys
import socket

port = 8080
if (len(sys.argv) > 1):
    newport = sys.argv[1]
    if (newport == "all"):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind(('', 0))
        addr = s.getsockname()
        port = int(addr[1])
        s.close()
    else:
        port = int(sys.argv[1])

def get(self, *args, **kwargs):
    self.send_response(200)
    self.send_header('Content-type', 'application/json')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()
    body = ''
    path = self.path
    with open(path[1:]) as f:
        body = f.read()
    self.wfile.write(body.encode("utf8"))

try:
    import http.server
    class MyHandler(http.server.BaseHTTPRequestHandler):
        def do_GET(self, *args, **kwargs):
            get(self)
    def httpd(handler_class, server_address, file_=None):
        try:
            srvr = http.server.HTTPServer(server_address, handler_class)
            print('Server started at port '+str(port))
            srvr.serve_forever()  # serve_forever
        except KeyboardInterrupt:
            srvr.socket.close()
        except:
            print('Port '+str(port)+' already in use')
    httpd(MyHandler,('0.0.0.0', port))
except ImportError:
    import BaseHTTPServer
    class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
        def do_GET(self, *args, **kwargs):
            get(self)
    def httpd(handler_class, server_address, file_=None):
        try:
            srvr = BaseHTTPServer.HTTPServer(server_address, handler_class)
            print('Server started at port '+str(port))
            srvr.serve_forever()  # serve_forever
        except KeyboardInterrupt:
            srvr.socket.close()
        except:
            print('Port '+str(port)+' already in use')
    httpd(MyHandler,('0.0.0.0', port))