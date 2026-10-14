package com.arkansasio.dungongen.rules;

import java.util.Map;

/** Optional Java service boundary for authoritative tabletop session logic. */
public final class RulesProfile {
    public enum Edition { DND_5E_2014_LEGACY, DND_5E_2024 }
    private final Edition edition;
    private final boolean useOpenSrdContent;
    public RulesProfile(Edition edition, boolean useOpenSrdContent) {
        this.edition = edition;
        this.useOpenSrdContent = useOpenSrdContent;
    }
    public Edition edition() { return edition; }
    public boolean useOpenSrdContent() { return useOpenSrdContent; }
    public static void validateTurn(Map<String, Object> turn) {
        if (turn == null || !turn.containsKey("actorId") || !turn.containsKey("action"))
            throw new IllegalArgumentException("A turn requires actorId and action.");
        Object action = turn.get("action");
        if (!(action instanceof String) || ((String) action).isBlank())
            throw new IllegalArgumentException("Turn action must be a non-empty string.");
    }
}
