exports.idlFactory = ({ IDL }) => {
  const InitOptions = IDL.Record({
    'turnManagers' : IDL.Vec(IDL.Principal),
    'whitelist' : IDL.Vec(IDL.Principal),
    'admins' : IDL.Vec(IDL.Principal),
  });
  const Tokens = IDL.Record({ 'e8s' : IDL.Nat64 });
  const BlockHeight = IDL.Nat64;
  const Error = IDL.Variant({
    'InvalidAccount' : IDL.Text,
    'TxTooOld' : IDL.Record({ 'allowed_window_nanos' : IDL.Nat64 }),
    'InvalidDetails' : IDL.Null,
    'NotPlayersTurn' : IDL.Null,
    'InvalidAmount' : IDL.Null,
    'TransferError' : IDL.Null,
    'NotInMatch' : IDL.Null,
    'AlreadyJoined' : IDL.Null,
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'InvalidAID' : IDL.Null,
    'BadFee' : IDL.Record({ 'expected_fee' : Tokens }),
    'InvalidToken' : IDL.Null,
    'BadParameters' : IDL.Null,
    'AlreadyVerified' : IDL.Text,
    'AlreadyExists' : IDL.Null,
    'AlreadyPlaying' : IDL.Null,
    'InvalidInvoiceId' : IDL.Null,
    'Unknown' : IDL.Text,
    'TxDuplicate' : IDL.Record({ 'duplicate_of' : BlockHeight }),
    'NotYetPaid' : IDL.Text,
    'NonExistentItem' : IDL.Null,
    'TxCreatedInFuture' : IDL.Null,
    'Expired' : IDL.Null,
    'InsufficientFunds' : IDL.Record({ 'balance' : Tokens }),
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const TokenSymbol = IDL.Text;
  const Details = IDL.Record({
    'meta' : IDL.Vec(IDL.Nat8),
    'description' : IDL.Text,
  });
  const MatchInit = IDL.Record({
    'minBet' : IDL.Nat,
    'tokenSymbol' : TokenSymbol,
    'details' : IDL.Opt(Details),
    'maxNumPlayers' : IDL.Nat,
    'maxBet' : IDL.Nat,
    'rounds' : IDL.Nat,
    'externalMatchId' : IDL.Text,
  });
  const AccountIdentifier = IDL.Variant({
    'principal' : IDL.Principal,
    'blob' : IDL.Vec(IDL.Nat8),
    'text' : IDL.Text,
  });
  const MatchInvoice = IDL.Record({
    'accountId' : AccountIdentifier,
    'invoiceId' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : MatchInvoice, 'err' : Error });
  const MatchPlayerStatus = IDL.Variant({
    'Fold' : IDL.Null,
    'Active' : IDL.Null,
    'Banned' : IDL.Null,
    'Winner' : IDL.Null,
    'Looser' : IDL.Null,
    'TimeBanned' : IDL.Null,
    'Exited' : IDL.Null,
  });
  const MatchPlayerStats = IDL.Record({
    'accumulatedBet' : IDL.Nat,
    'status' : MatchPlayerStatus,
    'joinPosition' : IDL.Nat,
    'lost' : IDL.Nat,
    'invoiceId' : IDL.Text,
    'earned' : IDL.Nat,
    'matchId' : IDL.Text,
    'position' : IDL.Nat,
    'points' : IDL.Nat,
    'playerPrincipal' : IDL.Principal,
  });
  const MatchesInfo = IDL.Record({
    'created' : IDL.Nat,
    'total' : IDL.Nat,
    'started' : IDL.Nat,
    'ended' : IDL.Nat,
  });
  const ContractInfo = IDL.Record({
    'matchesInfo' : MatchesInfo,
    'heapSize' : IDL.Nat,
    'maxLiveSize' : IDL.Nat,
    'icpBets' : IDL.Record({ 'e8s' : IDL.Nat64 }),
    'cycles' : IDL.Nat,
    'invoicesQty' : IDL.Nat,
    'authorizedUsers' : IDL.Vec(IDL.Principal),
    'playersQty' : IDL.Nat,
    'memorySize' : IDL.Nat,
  });
  const Result_5 = IDL.Variant({ 'ok' : ContractInfo, 'err' : Error });
  const PlayerStats = IDL.Record({
    'matchesLost' : IDL.Nat,
    'lost' : IDL.Nat,
    'earned' : IDL.Nat,
    'matchesWon' : IDL.Nat,
    'points' : IDL.Nat,
  });
  const Result_4 = IDL.Variant({ 'ok' : PlayerStats, 'err' : Error });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Principal),
    'err' : Error,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : Error });
  const BetOptions = IDL.Variant({
    'Call' : IDL.Null,
    'Fold' : IDL.Null,
    'Raise' : IDL.Record({ 'amountBet' : IDL.Nat }),
  });
  const TurnInit = IDL.Variant({
    'OpenRound' : BetOptions,
    'OpenPot' : BetOptions,
    'RegularTurn' : BetOptions,
    'ForcedExit' : IDL.Record({
      'text' : IDL.Text,
      'detail' : IDL.Variant({
        'LeaveGame' : IDL.Null,
        'Banned' : IDL.Null,
        'TimeLimit' : IDL.Null,
      }),
    }),
  });
  const anon_class_33_1 = IDL.Service({
    'addNewAdmin' : IDL.Func([IDL.Vec(IDL.Principal)], [Result], []),
    'addNewTurnManager' : IDL.Func([IDL.Vec(IDL.Principal)], [Result], []),
    'createMatch' : IDL.Func([MatchInit], [Result_1], []),
    'endMatch' : IDL.Func(
        [IDL.Text, IDL.Vec(MatchPlayerStats), IDL.Nat],
        [Result],
        [],
      ),
    'getContractInfo' : IDL.Func([], [Result_5], ['query']),
    'getPlayerStats' : IDL.Func([IDL.Principal], [Result_4], ['query']),
    'getWhitelistedUsers' : IDL.Func([], [Result_3], ['query']),
    'isUserWhitelisted' : IDL.Func([IDL.Principal], [Result_2], []),
    'joinMatch' : IDL.Func([IDL.Text], [Result_1], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'startMatch' : IDL.Func([IDL.Text], [Result], []),
    'turnExec' : IDL.Func([TurnInit], [Result], []),
    'wallet_balance' : IDL.Func([], [IDL.Nat], []),
    'wallet_receive' : IDL.Func(
        [],
        [IDL.Record({ 'accepted' : IDL.Nat64 })],
        [],
      ),
    'whitelistUser' : IDL.Func([IDL.Vec(IDL.Principal)], [Result], []),
  });
  return anon_class_33_1;
};
exports.init = ({ IDL }) => {
  const InitOptions = IDL.Record({
    'turnManagers' : IDL.Vec(IDL.Principal),
    'whitelist' : IDL.Vec(IDL.Principal),
    'admins' : IDL.Vec(IDL.Principal),
  });
  return [InitOptions];
};
