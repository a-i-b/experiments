package aib.dvs.av;

import java.nio.ByteBuffer;
import java.util.function.Consumer;

public interface IRTPReceiver {
	boolean run(Consumer<ByteBuffer> callback);
	boolean stop();
}
