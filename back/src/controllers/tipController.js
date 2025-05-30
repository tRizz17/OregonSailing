import zmq from 'zeromq';

export const getTip = async (req, res) => {
  const sock = new zmq.Request();
  sock.connect("tcp://localhost:5555");
  await sock.send("tip");
  const [msg] = await sock.receive();
  res.json({ tip: msg.toString() });
  sock.close();
}; 