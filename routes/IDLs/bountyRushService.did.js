exports.idlFactory = ({ IDL }) => {
  const DetailValue = IDL.Rec();
  const InitOptions = IDL.Record({
    'turnManagers' : IDL.Vec(IDL.Principal),
    'admins' : IDL.Vec(IDL.Principal),
    'allowList' : IDL.Opt(IDL.Vec(IDL.Principal)),
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
  const EndMatchPlayerStats = IDL.Record({
    'principal' : IDL.Principal,
    'position' : IDL.Nat,
    'points' : IDL.Nat,
  });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Opt(IDL.Vec(IDL.Principal)),
    'err' : Error,
  });
  DetailValue.fill(
    IDL.Variant({
      'I64' : IDL.Int64,
      'U64' : IDL.Nat64,
      'Vec' : IDL.Vec(DetailValue),
      'Slice' : IDL.Vec(IDL.Nat8),
      'Text' : IDL.Text,
      'True' : IDL.Null,
      'False' : IDL.Null,
      'Float' : IDL.Float64,
      'Principal' : IDL.Principal,
    })
  );
  const ContractInfo = IDL.Record({
    'heapSize' : IDL.Nat,
    'maxLiveSize' : IDL.Nat,
    'cycles' : IDL.Nat,
    'details' : IDL.Vec(IDL.Tuple(IDL.Text, DetailValue)),
    'memorySize' : IDL.Nat,
  });
  const PlayerStats = IDL.Record({
    'matchesLost' : IDL.Nat,
    'lost' : IDL.Nat,
    'earned' : IDL.Nat,
    'matchesWon' : IDL.Nat,
    'points' : IDL.Nat,
  });
  const Result_3 = IDL.Variant({ 'ok' : PlayerStats, 'err' : Error });
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
  const anon_class_34_1 = IDL.Service({
    'addNewAdmin' : IDL.Func([IDL.Vec(IDL.Principal)], [Result], []),
    'addNewTurnManager' : IDL.Func([IDL.Vec(IDL.Principal)], [Result], []),
    'allowUsers' : IDL.Func([IDL.Vec(IDL.Principal)], [Result], []),
    'createMatch' : IDL.Func([MatchInit], [Result_1], []),
    'endMatch' : IDL.Func(
        [IDL.Text, IDL.Vec(EndMatchPlayerStats), IDL.Nat],
        [Result],
        [],
      ),
    'freePlayers' : IDL.Func([], [Result], []),
    'getAllowedUsers' : IDL.Func([], [Result_4], ['query']),
    'getContractInfo' : IDL.Func([], [ContractInfo], ['query']),
    'getPStatsOrderedByPoints' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, PlayerStats))],
        ['query'],
      ),
    'getPlayerStats' : IDL.Func([IDL.Principal], [Result_3], ['query']),
    'isUserAllowed' : IDL.Func([IDL.Principal], [Result_2], []),
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
  });
  return anon_class_34_1;
};
exports.init = ({ IDL }) => {
  const InitOptions = IDL.Record({
    'turnManagers' : IDL.Vec(IDL.Principal),
    'admins' : IDL.Vec(IDL.Principal),
    'allowList' : IDL.Opt(IDL.Vec(IDL.Principal)),
  });
  return [InitOptions];
};
