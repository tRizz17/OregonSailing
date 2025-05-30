import zmq from 'zeromq';

export const getTerm = async (req, res) => {
  const sock = new zmq.Request();
  sock.connect("tcp://localhost:5556");
  await sock.send("term");
  const [msg] = await sock.receive();
  res.json({ term: msg.toString() });
  sock.close();
}; 