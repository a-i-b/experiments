package aib.dvs.av;

import java.util.function.Consumer;

public interface IRTPReceiver {
	boolean Start(Consumer<char[]> callback);
	boolean Stop();
}
