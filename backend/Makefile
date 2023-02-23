BUILD_DIR     := ext/medik-semantics/.build/llvm-exec/medik-llvm-kompiled
BUILD_LOCAL   := $(abspath $(BUILD_DIR)/local)
LOCAL_LIB     := $(BUILD_LOCAL)/lib

DEPS_DIR         := ext
K_SUBMODULE      := $(DEPS_DIR)/medik-semantics/ext/k

K_RELEASE ?= $(K_SUBMODULE)/k-distribution/target/release/k
K_BIN     := $(K_RELEASE)/bin
K_LIB     := $(K_RELEASE)/lib

GREEN := \033[0;32m
RESET := \033[0m

TEST_EXEC_FILES := $(wildcard tests/*.psepsis.in)

# Run Tests Every time
tests: $(patsubst tests/%.psepsis.in, tests/%.psepsis.run, $(TEST_EXEC_FILES))

COMPARE := git --no-pager diff --no-index --ignore-all-space -R
FLAGS    := --output none

tests/%.psepsis.run: tests/%.psepsis.in tests/%.psepsis.expected psepsis.medik
	@$(K_BIN)/krun -d $(BUILD_DIR) $(FLAGS) psepsis.medik < $< > $@
	@./massage-output $@ | jq > $@.processed
	@$(COMPARE) $@.processed $(word 2, $^)
	@echo "=== $@: passed"

