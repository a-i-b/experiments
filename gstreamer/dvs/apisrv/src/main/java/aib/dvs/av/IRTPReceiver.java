package aib.dvs.av;

import java.nio.ByteBuffer;
import java.util.function.Function;

public interface IRTPReceiver {
	boolean run(Function<ByteBuffer, Boolean> callback);
	boolean stop();
}
