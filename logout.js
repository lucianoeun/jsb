on("playerDropped", (reason) => {
    console.log(
        `Player ${GetPlayerName(global.source)} dropped (Reason: ${reason}).`
    );
});  